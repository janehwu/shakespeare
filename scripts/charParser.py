import xml.etree.ElementTree
import sys


for filename in sys.argv:
    if filename == "charParser.py":
        continue  
    slashIndex = filename.index("/")
    extensionIndex = filename.index(".xml")
    file = filename[slashIndex + 1: extensionIndex - 1]
    
    
    e = xml.etree.ElementTree.parse(filename).getroot()
    
    # chars: list of all characters; sceneChars: 2d list of characters per scene
    chars = []
    sceneChars = [[]]
    sceneCount = 0
    
    # Gather speakers per scene into 2d list
    for scene in e.iter("SCENE"):
        for speech in scene.iter("SPEECH"):
            for speaker in speech.iter("SPEAKER"):
                if speaker.text not in sceneChars[sceneCount]:
                    sceneChars[sceneCount] += [speaker.text]
                    if speaker.text not in chars:
                        chars += [speaker.text]
        sceneCount += 1
        sceneChars += [[]]
    
    # matrix: 2d list of integers; integer value = how often 2 characters speak
    # num scenes shared with:[ A,   B,   C,   D   ]
    # format:    character A [ 0,   1,   2,   0   ]
    #            character B [ 1,   0,   5,   2   ]
    #            character C [ 2,   5,   0,   1   ]
    #            character D [ 0,   2,   1,   0   ]
    #
    speakerCount = len(chars)
    matrix = []
    
    # prepopulate matrix with 0's (base value)
    for i in range(speakerCount):
        if i != speakerCount:
            matrix += [[]]    
        for j in range(speakerCount):
            matrix[i] += [0]
     
    # populate matrix with proper values
    for scene in sceneChars:
        for char1 in scene:
            for char2 in scene:
                index1 = chars.index(char1)
                index2 = chars.index(char2)
                if index1 != index2 :
                    matrix[index1][index2] += 1
    
    colorAddition = 360.0/len(chars)
    color = 0
    
    csv = ""
    
    csv += "name,color\n"
   
    print chars
    print file
    print "------------------------"
    for char in chars:
        csv += char.capitalize()
        csv +=  ",\"d3.hsl(" 
        csv += str(color)
        csv += ", 1, .5)\"\n"
        color += colorAddition
       


    f = open("csvDat/" + file + ".csv", 'a+')
    f.write(csv)
    
    f = open("matrixDat/" + file + ".json", 'a+')
    f.write(str(matrix))

