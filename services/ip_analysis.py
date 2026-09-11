import re


def extract_ips(received_headers):
    received_ips = []

    for header in received_headers:
        ips = re.findall(
            r'\b(?:\d{1,3}\.){3}\d{1,3}\b',
            str(header)
        )
        received_ips.extend(ips)

    return received_ips

import ipaddress


def classify_ips(received_ips):
    private_ips = []
    public_ips = []

    for ip in received_ips:
        ip_obj = ipaddress.ip_address(ip)

        if ip_obj.is_private:
            private_ips.append(ip)
        else:
            public_ips.append(ip)

    return private_ips, public_ips