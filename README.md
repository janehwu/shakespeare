# Visualizing Shakespeare

Shakespeare’s works have been performed and analyzed for centuries, yet truly understanding the text often requires extensive manual data collection - from character relationships to prevalent themes to inter-play connections. Our project allows users to easily visualize the structural properties of Shakespeare’s plays, such that anyone from an actor to a director can enrich their interpretations of the text. Automated data collection provides us with more data to make the visualizations more detailed and accurate.

##Setup Instructions

###Flask Setup (ONE-TIME): http://flask.pocoo.org/docs/0.11/installation/
```
$ sudo easy_install virtualenv 
OR
$ sudo pip install virtualenv

$ cd shakespeare

$ virtualenv venv

Activate virtual environment:
$ . venv/bin/activate

$ pip install Flask

Deactivate virtual environment:

$ deactivate
```
###Running server
```
$ cd shakespeare
$ . venv/bin/activate
$ python server.py
```



