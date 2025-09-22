from flask import Flask,jsonify
from flask_cors import CORS
import mysql.connector

DB = mysql.connector.connect(
    host="localhost",
    user="webuser",
    password="UnaPasswordMoltoSicura",
    database="BiblioClick"
)

app = Flask(__name__)
CORS(app)

@app.route('/Register', methods=['POST'])
def main():
    return jsonify({"username":"admin"})

@app.route('/Login', methods=['GET'])
def main():
    return jsonify({"username":"admin"})

@app.route('/Search', methods=['GET'])
def main():
    return jsonify({"username":"admin"})

@app.route('/ClubDetails', methods=['GET'])
def main():
    return jsonify({"username":"admin"})

@app.route('/UserCalendar', methods=['GET'])
def main():
    return jsonify({"username":"admin"})

@app.route('/Comment', methods=['GET'])
def main():
    return jsonify({"username":"admin"})


if __name__ == '__main__':
    app.run()


