import os
from flask import Flask, render_template, request, url_for, json, jsonify

#Initiate Flask app
app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/')
def root():
	return render_template('index.html')

# Get play content for given play
@app.route('/get_play_content', methods=["POST"])
def get_play_content():
	if request.method == "POST":
		SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
		json_url = os.path.join(SITE_ROOT, 'static', "plays/json/" + request.data + ".json")
		data = json.load(open(json_url))
		return jsonify(data)

##############################################

if __name__ == "__main__":

	app.run(debug=True)