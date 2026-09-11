from urllib.parse import urlparse


def extract_domains(urls):
    domains = []

    for url in urls:
        domain = urlparse(url).netloc

        if domain:
            domain = domain.lower()

            if domain.startswith("www."):
                domain = domain[4:]

            domains.append(domain)

    return domains
SUSPICIOUS_TLDS = [
    ".tk",
    ".ml",
    ".ga",
    ".cf",
    ".gq",
]


def analyze_domains(domains):
    suspicious_domains = []

    for domain in domains:
        domain_lower = domain.lower()

        for tld in SUSPICIOUS_TLDS:
            if domain_lower.endswith(tld):
                suspicious_domains.append(domain)
                break

    return suspicious_domains