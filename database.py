from pymongo import MongoClient

database = MongoClient()["reflexdb"]
games = database['games']

def insert_new_game(gameinfo):
    age = gameinfo['age']
    sleep = gameinfo['sleep']
    time = gameinfo['time']
    email = gameinfo['email']
    gamedata = gameinfo['data']

    games.insert_one({
        'age': age,
        'sleep': sleep,
        'time': time,
        'email': email,
        'gamedata': gamedata 
    })