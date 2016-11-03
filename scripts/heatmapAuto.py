# lineDensities is a list of Acts
# Each index in lineDensities is a list of scenes
# Each scene contains a dictionary of (character : # lines)
symbols = [".", ",", '"', "'", ";"]

def getLineData(fileName):
	""" Parses text file version of a play. Files are organized with repeating structure:
		ACT 1
		=====

		Scene 1
		=======

		BARNARDO  Who's there?

	This function uses this structure to record number of lines for each character in each act/scene.
	Returns structure with line counts for each character in each act/scene. """

	lineDensities = []
	f = open(fileName, 'r')
	scene = -1
	act = -1
	character = ""
	for line in f:
		wordL = line.split()
		# Read in empty line
		if wordL == []:
			continue
		# If new Act or Induction, have to create new entries in lineDensities
		elif wordL[0] == "ACT" or wordL[0] == "INDUCTION":
			character = ""
			act += 1
			scene = -1
			lineDensities += [[]]
		# If new Scene, have to create new entries within current Act/Induction in lineDensities
		elif wordL[0] == "Scene":
			character = ""
			scene += 1
			lineDensities[act] += [{}]
		# Detecting words that are completely capitalized because this indicates a switch in who's speaking
		elif wordL[0].isupper() and act >= 0 and scene >= 0 and len(wordL[0]) > 2 and (wordL[0][0] not in symbols) and (wordL[0][-1] not in symbols):
			character = wordL[0]
			# Ignoring punctuation following name of character speaking
			if character[-1] == ",":
				character = character[:-1]
			characterLen = 1
			# Taking into account characters with multi word names
			for word in wordL[1:]:
				if word.isupper() and len(word) > 2 and ("." not in word):
					if word[-1] == ",":
						word = word[:-1]
					character += (" " + word)
					characterLen += 1
				else:
					break
			# Taking into account when two characters speak at the same time
			if "AND" in character:
				split = character.split()
				for word in split:
					if word != "AND":						
						lineDensities = newCharacter(act, scene, lineDensities, word, wordL)
			elif "/" in character:
				split = character.split("/")
				for word in split:						
					lineDensities = newCharacter(act, scene, lineDensities, word, wordL)
			# Normal situation in which a single character begins new dialogue
			else:
				lineDensities = newCharacter(act, scene, lineDensities, word, wordL)
		elif character == "":
			continue
		# If we don't have a switch in dialogue, we add 1 to the line count of the current character(s) who's speaking
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

def newCharacter(act, scene, lineDensities, word, wordL):
	""" Adding new character entry in lineDensities data structure when character speaks first time
	in new scene of an act. """
	# No dialogue on same line as character heading
	if word not in lineDensities[act][scene]:
		lineDensities[act][scene][word] = 0
	# Dialogue on same line as character heading
	if len(wordL) > characterLen:
		lineDensities[act][scene][word] += 1
	return lineDensities

def characterList(lineDensities):
	""" Creates list of all characters who speak in the play in order or appearance """
	characters = []
	for act in lineDensities:
		for scene in act:
			for character in scene:
				if character not in characters:
					characters += [character]
	return characters

def sceneList(lineDensities):
	""" Creates list of all acts/scenes in a play """
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
	""" Replacing single quote chars with double quote chars for purpose of creating JSON objects """
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
	""" Creating TSV file that creates rows organized by (character, scene, # of lines).
	File used to generate Heatmap for a specific play. """
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