import dns.resolver
from email.utils import parseaddr
import ipaddress


def evaluate_spf(spf_records, sending_ip):
    if not spf_records:
        return "NONE"

    spf_record = spf_records[0]

    if not sending_ip:
        return "UNKNOWN"

    parts = spf_record.split()

    for part in parts:
        if part.startswith("ip4:"):
            allowed_ip = part.replace("ip4:", "")

            if sending_ip == allowed_ip:
                return "PASS"

    if "-all" in parts:
        return "FAIL"

    if "~all" in parts:
        return "SOFTFAIL"

    if "?all" in parts:
        return "NEUTRAL"

    if "+all" in parts:
        return "PASS"

    return "UNKNOWN"


def extract_domain(sender):
    if not sender:
        return None 
    email_address = parseaddr(sender)[1]

    if "@" not in email_address:
        return None

    return email_address.split("@")[1].lower()


def get_dns_records(domain):
    records = {}

    try:
        answers = dns.resolver.resolve(domain, "A")
        records["A"] = [answer.to_text() for answer in answers]
    except Exception:
        records["A"] = []

    try:
        answers = dns.resolver.resolve(domain, "MX")
        records["MX"] = [answer.exchange.to_text() for answer in answers]
    except Exception:
        records["MX"] = []

    try:
       answers = dns.resolver.resolve(domain, "TXT")

       txt_records = []

       for answer in answers:
            txt_records.append(answer.to_text())

            records["TXT"] = txt_records

    except Exception:
        records["TXT"] = []
    spf_records = []


    for record in records["TXT"]:
        if record.startswith('"v=spf1'):
            spf_records.append(record)


    records["SPF"] = spf_records

    spf_policy = None
    if spf_records:
        spf_records = spf_records[0]

        if "-all" in spf_records:
            spf_policy = "hard fail"
        elif "~all" in spf_records:
            spf_policy = "soft fail"
        elif "?all" in spf_records :
            spf_policy = "neutral"
        elif "+all" in spf_records:
            spf_policy = "allow all"

    records["spf_policy"] = spf_policy

    
     

    return records