#created by Srinidhi Srinivasan
#Line Density Parser that reads in XML files of the plays and gathers info
# in a 2D array holding how many lines a character speaks per scene. 

import xml.etree.ElementTree
import sys

for filename in sys.argv: 
	if filename == "lineDensityParses.py":
		continue
	slashIndex = filename.index("/")
	extensionIndex = filename.index(".xml")
	file = filename[slashIndex + 1: extensionIndex - 1]

e = xml.etree.ElementTree.parse(filename).getroot()

#chars: list of all characters;
#sceneChars: 2d list of characters: 2d list of character per scene. 

#what i want is a 2d array where the rows are all the characters and the
#columns are tuples with the scene number and the number of lines. 
chars = []
sceneLines = [[]]
sceneChars = [[]]
sceneCount = 0

#Gather speakers per scene into 2d list

for scene in e.iter("SCENE"):
	for speech in scene.iter("SPEECH"):
		sceneLines[scene] += [speech.length - 1]
		print "sceneLines", sceneLines
		for speaker in speech.iter("SPEAKER"):
			if speaker.text not in sceneChars[sceneCount]:
				sceneChars[sceneCount] += [speaker.text]
				if speaker.text not in chars:
					chars += [speaker.text]
	sceneCount += 1
	sceneChars += [[]]


