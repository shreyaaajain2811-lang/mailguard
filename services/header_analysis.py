def analyze_headers(msg):
    return {
        "reply_to": msg.get("Reply-To"),
        "return_path": msg.get("Return-Path"),
        "message_id": msg.get("Message-ID"),
        "dkim_signature": msg.get("DKIM-Signature"),
        "authentication_results": msg.get("Authentication-Results"),
        "received_spf": msg.get("Received-SPF"),
        "originating_ip": msg.get("X-Originating-IP")
    }