from flask import Flask,jsonify, request
from flask_cors import CORS
import mysql.connector
import datetime

DB = mysql.connector.connect(
    host="localhost",
    user="webuser",
    password="UnaPasswordMoltoSicura",
    database="BiblioClick"
)

app = Flask(__name__)
CORS(app)

@app.route('/Register', methods=["POST"])
def main1():
    dbcursor = DB.cursor()
    sql = "INSERT INTO User (nome,cognome,username,email,password,data_reg) VALUES (%s,%s,%s,%s,%s,%s)"
    valori = (request.form.get("Nome"),request.form.get("Cognome"),request.form.get("Username"),request.form.get("Email"),request.form.get("Password"),datetime.datetime.now())
    dbcursor.execute(sql,valori)
    dbcursor.close()
    DB.commit()
    return jsonify({"username":"T'APPOST"})

@app.route('/Login', methods=['GET'])
def main2():
    return jsonify({"username":"admin"})

@app.route('/Search', methods=['GET'])
def main3():
    return jsonify({"username":"admin"})

@app.route('/ClubDetails', methods=['GET'])
def main4():
    return jsonify({"username":"admin"})

@app.route('/UserCalendar', methods=['GET'])
def main5():
    return jsonify({"username":"admin"})

@app.route('/Comment', methods=['GET'])
def main6():
    return jsonify({"username":"admin"})


if __name__ == '__main__':
    app.run()


