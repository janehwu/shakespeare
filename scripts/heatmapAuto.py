# lineDensities is a list of Acts
# Each index in lineDensities is a list of scenes
# Each scene contains a dictionary of (character : # lines)
symbols = [".", ",", '"', "'", ";"]

def getLineData(fileName):
	lineDensities = []
	f = open(fileName, 'r')
	scene = -1
	act = -1
	character = ""
	for line in f:
		wordL = line.split()
		if wordL == []:
			continue
		elif wordL[0] == "ACT" or wordL[0] == "INDUCTION":
			character = ""
			act += 1
			scene = -1
			lineDensities += [[]]
		elif wordL[0] == "Scene":
			character = ""
			scene += 1
			lineDensities[act] += [{}]
		elif wordL[0].isupper() and act >= 0 and scene >= 0 and len(wordL[0]) > 2 and (wordL[0][0] not in symbols) and (wordL[0][-1] not in symbols):
			character = wordL[0]
			if character[-1] == ",":
				character = character[:-1]
			characterLen = 1
			for word in wordL[1:]:
				if word.isupper() and len(word) > 2 and ("." not in word):
					if word[-1] == ",":
						word = word[:-1]
					character += (" " + word)
					characterLen += 1
				else:
					break
			if "AND" in character:
				split = character.split()
				for word in split:
					if word != "AND":						
						if word not in lineDensities[act][scene]:
							lineDensities[act][scene][word] = 0
						if len(wordL) > characterLen:
							lineDensities[act][scene][word] += 1
			elif "/" in character:
				split = character.split("/")
				for word in split:						
					if word not in lineDensities[act][scene]:
						lineDensities[act][scene][word] = 0
					if len(wordL) > characterLen:
						lineDensities[act][scene][word] += 1
			else:
				if character not in lineDensities[act][scene]:
					lineDensities[act][scene][character] = 0
				if len(wordL) > characterLen:
					lineDensities[act][scene][character] += 1
		elif character == "":
			continue
		elif len(wordL[0]) > 1 and (wordL[0][0].isupper() or wordL[0][1].isupper()):
			if "AND" in character:
				split = character.split()
				for word in split:
					if word != "AND":
						lineDensities[act][scene][word] += 1
			elif "/" in character:
				split = character.split("/")
				for word in split:
					lineDensities[act][scene][word] += 1
			else:
				lineDensities[act][scene][character] += 1
		else:
			continue
	return lineDensities

def characterList(lineDensities):
	characters = []
	for act in lineDensities:
		for scene in act:
			for character in scene:
				if character not in characters:
					characters += [character]
	return characters

def sceneList(lineDensities):
	sceneL = []
	roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
	for i in range(len(lineDensities)):
		for j in range(len(lineDensities[i])):
			sceneL += [roman[i] + "." + str(j + 1)]
	strSceneList = str(sceneL)
	newList = ""
	for character in strSceneList:
		if character == "'":
			newList += '"'
		else:
			newList += character
	return newList

def formatCharacterList(characterList):
	strCharacterList = str(characterList)
	newList = ""
	for character in strCharacterList:
		if character == "'":
			newList += '"'
		else:
			newList += character
	return newList


#character	scene	value
def makeTSV(lineDensities, characterList):
	f = open("Ham.tsv", 'w')
	f.write("character	scene	value\n")
	sceneNum = 0
	for act in lineDensities:
		for scene in act:
			sceneNum += 1
			for character in scene:
				characterNum = characterList.index(character) + 1
				lines = scene[character]
				f.write(str(characterNum) + "	" + str(sceneNum) + "	" + str(lines) + "\n")

	f.close()

lineDensities = getLineData("Ham.txt")
characterList = characterList(lineDensities)
print formatCharacterList(characterList)
print sceneList(lineDensities)
makeTSV(lineDensities, characterList)