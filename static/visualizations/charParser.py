import xml.etree.ElementTree

e = xml.etree.ElementTree.parse('macbeth.xml').getroot()

chars = []
sceneChars = [[]]
sceneCount = 0

for scene in e.iter("SCENE"):
    print scene
    for speech in scene.iter("SPEECH"):
        for speaker in speech.iter("SPEAKER"):
            print speaker.text
            if speaker.text not in sceneChars[sceneCount]:
                sceneChars[sceneCount] += [speaker.text]
                if speaker.text not in chars:
                    chars += [speaker.text]
    sceneCount += 1
    sceneChars += [[]]


speakerCount = len(chars)
matrix[speakerCount][speakerCount] = [[]]
print matrix



