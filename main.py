import hashlib


from services import email_parser
from services import ip_analysis
from services import header_analysis
from services import body_analysis
from services import attachment_analysis
from services import risk_analysis
from services import url_analysis
from services import domain_analysis
from services import geoip_analysis
from fastapi import FastAPI, UploadFile, File
from services import dns_analysis

app = FastAPI()


@app.get("/")
def home():
    return {"message": "Email Forensics Platform is running"}


@app.post("/analyze-email")
async def analyze_email(file: UploadFile = File(...)):
    data = await file.read()
    file_size = len(data)
    file_hash = hashlib.sha256(data).hexdigest()

    msg = email_parser.parse_email(data)

    sender = msg["From"]
    sender_domain = dns_analysis.extract_domain(sender)
    recipient = msg["To"]
    subject = msg["subject"]
    date = msg["date"]

    received = msg.get_all("Received")
    received_count = len(received) if received else 0
    received_headers = received if received else []
    received_ips = ip_analysis.extract_ips(received_headers)
    private_ips, public_ips = ip_analysis.classify_ips(received_ips)
    geoip_data = geoip_analysis.analyze_ips(public_ips)
    header_data = header_analysis.analyze_headers(msg)
    body_data = body_analysis.extract_body(msg)
    body = body_data["content"]
    body_content_type = body_data["content_type"]
    urls = url_analysis.extract_urls(body)
    suspicious_urls = url_analysis.analyze_urls(urls)
    domains = domain_analysis.extract_domains(urls)
    suspicious_domains = domain_analysis.analyze_domains(domains)
    dns_data = {}
    for domain in domains:
      dns_data[domain] = dns_analysis.get_dns_records(domain)
    spf_result = None

    if sender_domain:
      sender_dns = dns_analysis.get_dns_records(sender_domain)

      spf_result = dns_analysis.evaluate_spf(
        sender_dns["SPF"],
        public_ips[0] if public_ips else None
    )
    attachments = attachment_analysis.extract_attachments(msg)
    risk_score = risk_analysis.calculate_risk(
    sender,
    subject,
    body,
    header_data,
    attachments,
    public_ips,
    suspicious_urls,
    suspicious_domains
    
    )

    return {
        "filename": file.filename,
        "file_size": file_size,
        "file_hash": file_hash,
        "sender": sender,
        "sender_domain" : sender_domain,
        "spf_result" : spf_result,
        "recipient": recipient,
        "subject": subject,
        "date": date,
        "received": received_headers,
        "received_ips": received_ips,
        "received_count": received_count,
        "header_analysis": header_data,
        "body": body,
        "body_content_type": body_content_type,
        "urls": urls,
        "suspicious_urls" : suspicious_urls,
        "domains":domains,
        "suspicious_domains" : suspicious_domains,
        "geoip_analysis": geoip_data,
        "attachments": attachments,
        "risk_analysis": risk_score,
        "dns_analysis": dns_data,

        "message": "Email received successfully"
    }