import hashlib


def extract_attachments(msg):
    attachments = []

    for part in msg.iter_attachments():
        data = part.get_payload(decode=True) or b""
        filename = part.get_filename()

        attachments.append({
            "filename": filename,
            "content_type": part.get_content_type(),
            "size": len(data),
            "extension": (
                filename.rsplit(".", 1)[-1]
                if filename and "." in filename
                else None
            ),
            "hash": hashlib.sha256(data).hexdigest()
        })

    return attachments