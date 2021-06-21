hex = ""
b=""

if hex[1] == 'x':
	for i in hex:
		if i != '0' and i != 'x' and i != ' ':
			b+=i
	b = bytes.fromhex(b)
	b = b.decode("ASCII")
	print(b)