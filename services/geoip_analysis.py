import requests


def analyze_ip(ip):
    url = f"https://ipwho.is/{ip}"

    response = requests.get(url, timeout=5)
    data = response.json()

    if not data.get("success"):
        return {
            "ip": ip,
            "error": "GeoIP lookup failed"
        }


def analyze_ips(public_ips):
    geoip_data = []

    for ip in public_ips:
        result = analyze_ip(ip)
        geoip_data.append(result)

    return geoip_data

    return {
        "ip": ip,
        "country": data.get("country"),
        "region": data.get("region"),
        "city": data.get("city"),
        "latitude": data.get("latitude"),
        "longitude": data.get("longitude"),
        "isp": data.get("connection", {}).get("isp"),
        "asn": data.get("connection", {}).get("asn")
    }