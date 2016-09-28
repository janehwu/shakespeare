/**
   * Service for listing plays
   * Uses embedded, hard-coded data model; acts asynchronously to simulate
   * remote data service call(s).
   */
function NavService($q){
    var plays = [
      {
        name: 'All\'s Well That Ends Well',
        year: "1602",
        genre: "Comedy",
        avatar: 'svg-1',
        content: 'Bertram, the son of a widowed countess sets off from Roussilon with his friend, Parolles, and the Lord Lafeu, to the French court. He is the ward of the French king. He is unaware that Helena, orphan daughter of the countess’ physician, raised in the household of the countess, is in love with him. The countess gives her permission to try and cure the king’s illness. No-one has been able to cure him but Helena succeeds and, as a reward, the king invites her to choose a husband from among his wards. She chooses Bertram. Bertram’s ambitions for a wife go beyond her, however, and although he marries her on the king’s orders, he runs away with Parolles to fight in the wars in Italy.He writes a letter to Helena, telling her that he will not recognise the marriage until she can demonstrate that she is wearing his heirloom ring and carrying his child. Helena goes home and prepares to seek Bertram out. She disguises herself as a pilgrim and goes to Florence where she is befriended by a widow and her daughter, Diana. In the meantime Bertram has fallen in love with Diana. Helena fakes her death and Bertram returns to the French court. His mother and Lafeu, also believing Helena to be dead, arrange for Bertram to marry Lafeu’s daughter. Bertram gives Lafeu a ring that Helena, as Diana, had given him at the late night meeting in Florence and it becomes apparent that it is the ring that the king had given Helena on her marriage to Bertram. In the midst of the confusion Diana arrives with Bertram’s ring and accuses him of seducing and abandoning her. Bertram denies it but Lafeu withdraws his daughter from the marriage. The king orders that Diana be taken to prison but then Helena appears as a witness to the truth of Diana’s story. She is pregnant and her story soon comes out. Bertram accepts her as his wife. The king offers Diana a choice of husbands from among his courtiers, with a rich dowry. The play ends with everyone being more or less satisfied.'
      },
      {
        name: 'Antony and Cleopatra',
        year: "1606",
        genre: "Tragedy",
        avatar: 'svg-2',
        content: 'After defeating Brutus and Cassius, following the assassination of Julius Caesar, Mark Antony becomes one of the three rulers of the Roman Empire, together with Octavius Caesar and Lepidus, and is responsible for the eastern part of the empire. He falls in love with Cleopatra, the Queen of Egypt, and settles in Alexandria. However, he is compelled to return to Rome when the empire is threatened by the rebellion of Sextus Pompey, the son of Pompey, who had been defeated by Julius Caesar. As his wife has just died Antony marries Octavius’ sister, Octavia, in an attempt to heal the rift between the two emperors. They make peace with Pompey. When Cleopatra hears about Antony’s marriage she flies into a jealous rage but knows that Antony does not love Octavia. Antony goes to Athens but when war breaks out between Caesar and Pompey, Antony sends Octavia back to Rome and returns to Egypt. Caesar is incensed with Antony’s behaviour and he declares war on both Antony and Cleapatra. When the Romans arrive Antony is offered a choice of how to fight and, despite being renowned as the world’s greatest soldier, he chooses to fight on sea. The Egyptian navy is inadequate and when Cleopatra’s navy turns and flees, Antony follows them and Caesar defeats him. Cleopatra goes to her tomb and sends a message to Antony that she is dead. Antony is devastated and decides to kill himself. He botches the suicide and wounds himself without dying. His followers take him to Cleopatra’s tomb, where he dies in her arms. Cleopatra’s life is in tatters. Having lost Antony and being at the mercy of Caesar, she resolves to commit suicide. She has someone bring her some poisonous snakes and incites them to bite her. Caesar arrives just after her death and orders that the twolovers be buried together.'
      },
      {
        name: 'As You Like It',
        year: "1599",
        genre: "Comedy",
        avatar: 'svg-3',
        content: "Orlando, the youngest son of Sir Roland de Boys, is ill treated by his brother Oliver. When he responds to the general challenge issued by the Duke’s wrestler, Charles, Oliver tells Charles to injure Orlando if he can manage it. The Duke’s daughter, Celia, and her cousin, Rosalind, watch the match and Rosalind falls in love with Orlando. Orlando wins but the Duke gets angry when he discovers that Orlando is the son of his old enemy, Sir Roland de Boys. Rosalind gives Orlando a chain to wear and he falls in love with her. The Duke unexpectedly banishes Rosalind and she decides to find her father, the real Duke, who has been overthrown by his brother, Celia’s father, Frederick. Duke Senior lives in the forest of Arden. Together with the court jester, Touchstone, the girls set out, disguised as a country boy, Ganymede, and his sister, Aliena. Co-incidentally, Orlando, fearing for his life, has also left home, accompanied by his father’s servant, Adam. In the forest, the group from the court encounter a young shepherd, Silvius, and watch him being rejected by a shepherdess, Phoebe, as he declares his love for her. They meet an old shepherd, Corin, who is looking for someone to take over the sheep farm. Ganymede, who wants to settle in the forest, buys the lease. Duke Senior, unaware that his daughter is looking for him, is living a simple life with some courtiers and huntsmen. One of them is the melancholy Jaques, who reflects constantly on life. Orlando and Adam arrive and the outlaws welcome them and feed them. Orlando hangs some love poems that he has written to Rosalind from the branches of trees. Rosalind and Aliena find them. Ganymede helps him to cure his lovesickness by wooing him, Ganymede, as though he/she were Rosalind. A country girl, Audrey, falls in love with Touchstone and abandons her faithful William because of her love for the fool. Oliver is searching for his brother. He has an accident and Orlando saves his life. Orlando is slightly injured and when he tells Ganymede about it she faints. Oliver and Celia fall in love. Phoebe falls in love with Genymede. It all becomes very complicated. Hymen leads a masque; Rosalind re-emerges as a woman and her father gives her to Orlando; Phoebe accepts Silvius; Orlando’s older brother returns from university with the news that Celia’s father, Frederick, has retired as Duke to become a hermit; Jaques goes to join him. There is a joyful dance to celebrate the four marriages and the happy ending."
      },
      {
        name: 'Comedy of Errors',
        year: "1589",
        genre: "Comedy",
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
      },
      {
        name: 'Coriolanus',
        year: "1607",
        genre: "Tragedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Cymbeline',
        year: "1609",
        genre: "Tragedy",
        avatar: 'svg-6',
        content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
      },
      {
        name: 'Hamlet',
        year: "1600",
        genre: "Tragedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Henry IV',
        year: "1597",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Henry V',
        year: "1598",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Henry VI',
        year: "1590-1591",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Henry VIII',
        year: "1612",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Julius Caesar',
        year: "1599",
        genre: "Tragedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'King John',
        year: "1596",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'King Lear',
        year: "1605",
        genre: "Tragedy",
        avatar: 'svg-1',
        content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
      },
      {
        name: 'Love\'s Labour\'s Lost',
        year: "1594",
        genre: "Comedy",
        avatar: 'svg-2',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      },
      {
        name: 'Macbeth',
        year: "1605",
        genre: "Tragedy",
        avatar: 'svg-3',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      },
      {
        name: 'Measure for Measure',
        year: "1604",
        genre: "Comedy",
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
      },
      {
        name: 'Merchant of Venice',
        year: "1596",
        genre: "Comedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Merry Wives of Windsor',
        year: "1600",
        genre: "Comedy",
        avatar: 'svg-6',
        content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
      },
      {
        name: 'Midsummer Night\'s Dream',
        year: "1595",
        genre: "Comedy",
        avatar: 'svg-1',
        content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
      },
      {
        name: 'Much Ado about Nothing',
        year: "1598",
        genre: "Comedy",
        avatar: 'svg-2',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      },
      {
        name: 'Othello',
        year: "1604",
        genre: "Tragedy",
        avatar: 'svg-3',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      },
      {
        name: 'Pericles',
        year: "1608",
        genre: "History",
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
      },
      {
        name: 'Richard II',
        year: "1595",
        genre: "History",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Richard III',
        year: "1592",
        genre: "History",
        avatar: 'svg-6',
        content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
      },
      {
        name: 'Romeo and Juliet',
        year: "1594",
        genre: "Tragedy",
        avatar: 'svg-1',
        content: 'I love cheese, especially airedale queso. Cheese and biscuits halloumi cauliflower cheese cottage cheese swiss boursin fondue caerphilly. Cow port-salut camembert de normandie macaroni cheese feta who moved my cheese babybel boursin. Red leicester roquefort boursin squirty cheese jarlsberg blue castello caerphilly chalk and cheese. Lancashire.'
      },
      {
        name: 'Taming of the Shrew',
        year: "1593",
        genre: "Comedy",
        avatar: 'svg-2',
        content: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris.'
      },
      {
        name: 'Tempest',
        year: "1611",
        genre: "Comedy",
        avatar: 'svg-3',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      },
      {
        name: 'Timon of Athens',
        year: "1607",
        genre: "Tragedy",
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
      },
      {
        name: 'Titus Andronicus',
        year: "1593",
        genre: "Tragedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      },
      {
        name: 'Troilus and Cressida',
        year: "1601",
        genre: "Tragedy",
        avatar: 'svg-6',
        content: "Lebowski ipsum yeah? What do you think happens when you get rad? You turn in your library card? Get a new driver's license? Stop being awesome? Dolor sit amet, consectetur adipiscing elit praesent ac magna justo pellentesque ac lectus. You don't go out and make a living dressed like that in the middle of a weekday. Quis elit blandit fringilla a ut turpis praesent felis ligula, malesuada suscipit malesuada."
      },
      {
        name: 'Twelfth Night',
        year: "1599",
        genre: "Comedy",
        avatar: 'svg-3',
        content: "Raw denim pour-over readymade Etsy Pitchfork. Four dollar toast pickled locavore bitters McSweeney's blog. Try-hard art party Shoreditch selfies. Odd Future butcher VHS, disrupt pop-up Thundercats chillwave vinyl jean shorts taxidermy master cleanse letterpress Wes Anderson mustache Helvetica. Schlitz bicycle rights chillwave irony lumberhungry Kickstarter next level sriracha typewriter Intelligentsia, migas kogi heirloom tousled. Disrupt 3 wolf moon lomo four loko. Pug mlkshk fanny pack literally hoodie bespoke, put a bird on it Marfa messenger bag kogi VHS."
      },
      {
        name: 'Two Gentlement of Verona',
        year: "1594",
        genre: "Comedy",
        avatar: 'svg-4',
        content: 'Scratch the furniture spit up on light gray carpet instead of adjacent linoleum so eat a plant, kill a hand pelt around the house and up and down stairs chasing phantoms run in circles, or claw drapes. Always hungry pelt around the house and up and down stairs chasing phantoms.'
      },
      {
        name: 'Winter\'s Tale',
        year: "1601",
        genre: "Comedy",
        avatar: 'svg-5',
        content: 'Webtwo ipsum dolor sit amet, eskobo chumby doostang bebo. Bubbli greplin stypi prezi mzinga heroku wakoopa, shopify airbnb dogster dopplr gooru jumo, reddit plickers edmodo stypi zillow etsy.'
      }
    ];

    // Promise-based API
    return {
      loadAllPlays : function() {
        // Simulate async nature of real remote calls
        return $q.when(plays);
      }
    };
  }