# Created by Jane Wu
# Parser that reads in XML files of the plays and stores frequency of words in the plays
import xml.etree.ElementTree
import sys
import operator

#NLP library to ignore stop words, i.e. "and", "the", etc.
from nltk.corpus import stopwords

for filename in sys.argv: 
	print filename
	if filename == "wordCountParser.py":
		continue
	# slashIndex = filename.index("/")
	# extensionIndex = filename.index(".xml")
	# file = filename[slashIndex + 1: extensionIndex - 1]

e = xml.etree.ElementTree.parse(filename).getroot()

# Dictionary with key: word, value: word count
wordCounts = {}
# Format for D3
commonWords = []
frequency_list = []

# Common Shakespeare words
shakespeareStopWords = []
with open("stopwords.txt") as f:
    shakespeareStopWords = f.readlines()
for i in range(len(shakespeareStopWords)):
	shakespeareStopWords[i] = shakespeareStopWords[i].strip("\n")


for scene in e.iter("SCENE"):
	for speech in scene.iter("SPEECH"):
		for line in speech.iter("LINE"):
			if not line.text:
				continue
			words = [word.lower().replace(",","").replace(".","").replace("?","").replace("!","").replace("--","").replace("'s","")
				for word in line.text.split()]
			for word in words:
				if (word not in stopwords.words('english')) and (word not in shakespeareStopWords):
					if not (word in wordCounts):
						if word == 'hath':
							print word
						wordCounts[word] = 1
					else:
						wordCounts[word] += 1

for word in wordCounts:
	if wordCounts[word] > 4:
		frequency_list.append({"text":word,"size":wordCounts[word]})

sorted_list = sorted(wordCounts.items(), key=operator.itemgetter(1))
for tup in sorted_list:
	word = tup[0]
	if wordCounts[word] >= 12:
		commonWords.append(word)

# Write result to file
text_file = open("output.txt", "w")
text_file.write(str(frequency_list))
text_file.close()



		




