from email.parser import BytesParser
from email.policy import default


def parse_email(data):
    msg = BytesParser(policy=default).parsebytes(data)
    return msg