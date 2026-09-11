def extract_body(msg):
    body_part = msg.get_body(preferencelist=("plain", "html"))

    if body_part:
        return {
            "content": body_part.get_content(),
            "content_type": body_part.get_content_type()
        }

    return {
        "content": None,
        "content_type": None
    }