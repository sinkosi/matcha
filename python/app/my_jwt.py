import hashlib
import hmac
import base64
import json

def generate_header():
    header = {'alg':'HS256','typ':'JWT'}
    return header

def sign_token(header, payload):
    payload_bytes = bytes(json.dumps(payload), 'utf-8')
    header_bytes = bytes(json.dumps(header), 'utf-8')
    secret_key = "very-safe-key"
    secret_key_bytes = bytes(secret_key, 'utf-8')

    payload_b64 = base64.b64encode(payload_bytes)
    payload_b64 = str(payload_b64, 'utf-8').strip('=').encode('utf-8')
    
    header_b64 = base64.b64encode(header_bytes)
    header_b64 = str(header_b64, 'utf-8').strip('=').encode('utf-8')
    
    secret_key_b64 = base64.b64encode(secret_key_bytes)
    secret_key_b64 = str(secret_key_b64, 'utf-8').strip('=').encode('utf-8')

    
    payload_header = header_b64 + bytes('.', 'utf-8') + payload_b64
    
    my_hamc = hmac.new(secret_key_b64, payload_header , digestmod=hashlib.sha256).digest()
    signature = base64.b64encode(my_hamc)
    signature = str(signature, 'utf-8').strip('=').encode('utf-8')
    token = payload_header + bytes('.', 'utf-8') + signature

    return str(token, 'utf-8')



def verify_token(header_b64_str, payload_b64_str, signature_b64_str):
    header = header_b64_str.encode('utf-8')
    payload = payload_b64_str.encode('utf-8')

    secret_key = "very-safe-key"
    secret_key_bytes = bytes(secret_key, 'utf-8')
    secret_key_b64 = base64.b64encode(secret_key_bytes)
    secret_key_b64 = str(secret_key_b64, 'utf-8').strip('=').encode('utf-8')

    payload_header = header + bytes('.', 'utf-8') + payload

    my_hamc = hmac.new(secret_key_b64, payload_header , digestmod=hashlib.sha256).digest()
    signature = base64.b64encode(my_hamc)
    signature = str(signature, 'utf-8').strip('=')
    if signature != signature_b64_str:
        return False
    
    return True

