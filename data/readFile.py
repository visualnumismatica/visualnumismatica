import csv

def writeCSV(dic, root):
	k = 0
	numMonedas = 0
	with open('D:\\Documents\\2017-II\\Visual Computing\\Proyecto\\Datos\\nomisma1.csv', 'wb') as csvfile:
		spamwriter = csv.writer(csvfile, delimiter=',')
		for x in dic:
			if len(dic[x]) == 6:
				monedas = []
				fields = x.split(',')
				monedas.append(x)
				for i in dic[x]:
					monedas.append(i)
				spamwriter.writerow(monedas);
				k += 1
	print k
def readMonedas():
	dic = {}
	
	init = "D:\\Documents\\2017-II\\Visual Computing\\Proyecto\\Datos\\nomisma.rdf"
	archivos = {}
	
	archivos['2017-06-'] = [20,30]
	
	k = 0
	monedas = {}
	moneda = False
	observe = False
	f = open(init, "r")
	array = []
	
	next = f.read(1)
	name = ''
	field = 0
	image = False
	while next != "":
		
		next = f.readline()
		line = next.split(' ')
		if '<nmo:NumismaticObject' in line:
			moneda = True
		if(moneda):
			#print line
			if '<dcterms:title' in line:
				name = findFieldName('<dcterms:title', '</dcterms:title>\n', monedas, line)
				#print name
			if '<nmo:hasAxis' in line:
				#print line
				findField('<nmo:hasAxis', '</nmo:hasAxis>\n', monedas, name, line)
			if '<nmo:hasDiameter' in line:
				findField('<nmo:hasDiameter','</nmo:hasDiameter>\n', monedas, name, line)
			if '<nmo:hasWeight' in line:
				findField('<nmo:hasWeight', '</nmo:hasWeight>\n', monedas, name, line)
			if '<nmo:hasObverse>' in line:
				image = True
			if('<foaf:depiction' in line):
				findFieldURL('<foaf:depiction', monedas, name, line)
	print len(monedas)
	writeCSV(monedas, '')	

def findFieldName(stringInit, stringEnd, coins, line):
	name = ''
	#print line
	if stringInit in line:
		i = line.index(stringInit)
		j = line.index(stringEnd)
		name = ' '.join(line[i+2:j])
		fields = name.split(',')
		name = '-'.join(fields[0:3])
		#print name
	if name not in coins:

		coins[name] = []
		lastField = fields[len(fields)-1]
		date = lastField.split(' ')[1:3]
		date = '-'.join(date)
		coins[name].append(date)
		
	return name
def findField(stringInit, stringEnd, coins, name, line):
	field = ''
	if stringInit in line:
		i = line.index(stringInit)
		j = line.index(stringEnd)
		field = ' '.join(line[i+2:j])
		#print "Field: " + field
	if name in coins:
		coins[name].append(field)

def findFieldURL(stringInit, coins, name, line):
	#print line
	field = ''
	if stringInit in line:
		i = line[17].find('rdf:resource="')
		j = line[17].find('/>' + '\n')
		field = line[17][i+14:j-1]
		#print field
	if name in coins:
		coins[name].append(field)

readMonedas()