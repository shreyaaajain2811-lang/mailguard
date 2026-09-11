import re


def extract_urls(text):
    if not text:
        return []

    pattern = r'https?://[^\s<>"\']+'
    return re.findall(pattern, text)


def analyze_urls(urls):
    suspicious_urls = []

    suspicious_patterns = [
        "login",
        "verify",
        "account",
        "password",
        "secure",
        "bank",
        "update",
    ]

    for url in urls:
        url_lower = url.lower()

        for pattern in suspicious_patterns:
            if pattern in url_lower:
                suspicious_urls.append(url)
                break

    return suspicious_urls