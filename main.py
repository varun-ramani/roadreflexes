from app import app
from flask import render_template, request, json
from database import games, insert_new_game
from bson.json_util import dumps

@app.route('/')
def main(): 
    return render_template('index.html')

@app.route('/dumpdb', methods=['GET'])
def dumpdb():
    returnstr = ""
    for document in games.find({}):
        returnstr += "<pre>" + dumps(document, indent=4) + "</pre>"
    return returnstr
        

@app.route('/addgame', methods=['POST'])
def addgame():
    print("Adding new game!")
    insert_new_game(json.loads(request.data))
    return "Added"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port='80', debug=True)