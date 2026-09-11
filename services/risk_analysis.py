SUSPICIOUS_KEYWORDS = [
    "urgent",
    "verify your account",
    "password",
    "click here",
    "account suspended",
    "payment",
    "bank",
    "login",
]


def calculate_risk(sender, subject, body, header_data, attachments, public_ips,suspicious_urls, suspicious_domains ):
    risk_score = 0

    text = f"{subject or ''} {body or ''}".lower()

    for keyword in SUSPICIOUS_KEYWORDS:
        if keyword in text:
            risk_score += 5

    if not sender:
        risk_score += 10

    if not subject:
        risk_score += 5

    if not body:
        risk_score += 10

    if not header_data.get("authentication_results"):
        risk_score += 10

    if attachments:
        risk_score += 10

    if public_ips:
        risk_score += 5
    if suspicious_urls:
     risk_score += 10

    if suspicious_domains:
     risk_score += 10

    if risk_score >= 30:
        risk_level = "HIGH"
    elif risk_score >= 15:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    if risk_score >= 30:
     classification = "HIGH RISK"
    elif risk_score >= 15:
     classification = "SUSPICIOUS"
    else:
     classification = "SAFE"

    return {
        "score": risk_score,
        "level": risk_level,
        "classification" : classification
    }