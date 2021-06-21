octal=""
a=""
for i in octal:
	if i != '0':
		a+=i
b = ""
for i in a.split(" "):
	b += chr(int(i, 8))
print(b)