b = ""
b = b.split()
a = ""
for i in b:
	c = int(i, 2)
	c = chr(c)
	a += c
print(a)