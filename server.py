from flask import Flask, render_template, request

#Initiate Flask app
app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/load_ajax', methods=["POST"])
def load_ajax():
    if request.method == "POST":
        play_move(request.data)
        return request.data

##############################################

if __name__ == "__main__":

    app.run(debug=True)