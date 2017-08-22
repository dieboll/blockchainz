for each transaction:
t = new tuple
t1 = balance btc
t2 = balance btc converted to usd value at that time
t3 = sqrt(t1^2+t2^2)
t4 = log(time)
frustumlengths.add(t)

generatefrustum (lengths1, lenghts2):
top = makeright triangle(lengths1)
bottom = makeright triangle(lengths2)
bottom.translate.y(lenghts1.t4)
mesh frustum = connect(top,bottom)
return frustum

generatetexture(lengths):


for every length in frustum lengths starting with 2nd:
mesh = generatefrustum(length, lengths[i-1])

