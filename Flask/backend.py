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

@app.route('/Login', methods=["POST"])
def main2():
    dbcursor = DB.cursor()
    sql = "SELECT * FROM User WHERE username= %s AND password= %s"
    valori = (request.form.get("Username"),request.form.get("Password"))
    dbcursor.execute(sql,valori)
    row = dbcursor.fetchall()
    dbcursor.close()
    print(row)
    if (row):
        return jsonify({"msg":"OK", "informazioni": row})
    else:
        return jsonify({"msg":"Fail"})
@app.route('/UpdateUser', methods=["POST"])
def update(): 
    
    nome = request.form.get("nome")
    cognome = request.form.get("cognome")
    email = request.form.get("email")
    password = request.form.get("password")
    id_user = request.form.get("IdUtente")
    dbcursor = DB.cursor()
    if nome != "":
        query = "UPDATE User SET nome = %s WHERE id_user =%s AND password = %s"
        valori = (nome,id_user,password)
        dbcursor.execute(query, valori)

    if cognome != "":
        query = "UPDATE User SET cognome = %s WHERE id_user =%s AND password = %s"
        valori = (cognome,id_user,password)
        dbcursor.execute(query, valori)

    if email != "":
        query = "UPDATE User SET email = %s WHERE id_user =%s AND password = %s"
        valori = (email,id_user,password)
        dbcursor.execute(query, valori)
    dbcursor.close()
    DB.commit()
    return jsonify({"msg":"ok"})

@app.route('/updateUserPassword', methods=["POST"])
def updatePassowrd():
    oldpassword = request.form.get("OldPassword")
    newpassword = request.form.get("NewPassword")
    ConfirmPassword = request.form.get("ConfirmPassword")
    id_user = request.form.get("IdUtente")
    query = "UPDATE User SET password = %s WHERE id_user =%s"
    dbcursor = DB.cursor()
    valori = (newpassword,id_user)
    if(newpassword == ConfirmPassword):
        dbcursor.execute(query,valori)
        dbcursor.close()
        DB.commit()
        return jsonify({"msg":"APPOST"})
    else:
        dbcursor.close()
        return jsonify({"msg":"NOT APPOST"})


#cercare tutti i libri compreso di filtri
@app.route('/Search', methods=['GET'])
def main3():
    tema = request.args.get("TemiLibri")
    min_membri = request.args.get("MinMembri", type=int)
    max_membri = request.args.get("MaxMembri", type=int)
    lingua = request.args.get("LinguaClub")
    frequenza = request.args.get("FrequenzaDiscussioni")
    ordinamento = request.args.get("Ordinamento")

    query = "SELECT * FROM Club WHERE 1=1"
    params = []

    if tema:
        query += " AND tematicaclub = %s"
        params.append(tema)
    if min_membri is not None:
        query += " AND numeropartecipantimax >= %s"
        params.append(min_membri)
    if max_membri is not None:
        query += " AND numeropartecipantimax <= %s"
        params.append(max_membri)
    if lingua:
        query += " AND linguaclub = %s"
        params.append(lingua)
    if frequenza:
        query += " AND frequenzadiscussioni = %s"
        params.append(frequenza)

    if ordinamento == "nome":
        query += " ORDER BY nomeclub"
    elif ordinamento == "membri":
        query += " ORDER BY numeropartecipantimax DESC"

    # eseguo query
    cursor = DB.cursor(dictionary=True)
    cursor.execute(query, tuple(params))
    results = cursor.fetchall()
    cursor.close()

    return jsonify(results)







#cercare i dettagli del club selezionato
@app.route('/ClubDetails', methods=['GET'])
def main4():
    return jsonify({"username":"admin"})
#visualizzare tutti gli eventi di quel utente
@app.route('/UserCalendar', methods=['GET'])
def main5():
    return jsonify({"username":"admin"})
#visualizzare tutti i commenti di un club
@app.route('/Comment', methods=['GET'])
def main6():
    return jsonify({"username":"admin"})


if __name__ == '__main__':
    app.run()


