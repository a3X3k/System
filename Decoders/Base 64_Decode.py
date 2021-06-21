import base64

b = ""

if b[0].isalpha():
	b = b.encode('ascii')
	b = base64.b64decode(b)
	b = b.decode('ascii')
	print(b)