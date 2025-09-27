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
    row = dbcursor.fetchone()
    dbcursor.close()
    if (row):
        return jsonify({"msg":"OK"})
    else:
        return jsonify({"msg":"Fail"})
    
@app.route('/myClub', methods=["GET"])
def myClub():
    dbcursor = DB.cursor()
    sql = "SELECT nomeclub,c.id_club FROM User a JOIN Membership b ON a.id_user = b.id_user JOIN Club c ON b.id_club = c.id_club  WHERE a.id_user = %s;"
    valori = (request.args.get("idUser"),)
    dbcursor.execute(sql,valori)
    row = dbcursor.fetchall()
    dbcursor.close()
    print(request.args.get("idUser"))
    if (row):
        return jsonify({"msg": row})
    else:
        return jsonify({"msg":"Errore"})
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


@app.route('/CreateClub', methods=['POST'])
def main7():

    nome = request.form.get("nomeClub")
    lingua = request.form.get("linguaClub")
    frequenza = request.form.get("frequenzaDiscussioni")
    tema = request.form.get("tematicaClub")
    max_membri = request.form.get("numeroPartecipantiMax")
    id_utente=request.form.get("id_utente")

    query = "INSERT INTO Club (nomeclub, tematicaclub, numeropartecipantimax, linguaclub, frequenzadiscussioni,id_admin) VALUES (%s, %s, %s, %s, %s, %s)"
    params = (nome, tema, max_membri, lingua, frequenza,id_utente)

    cursor = DB.cursor(dictionary=True)
    cursor.execute(query, params)
    rows = cursor.rowcount
    DB.commit()
    cursor.close()

    if (rows):
        return jsonify({"msg":"Successfull Created Club"})
    else:
        return jsonify({"msg":"Failed Created Club"})






#cercare i dettagli del club selezionato
@app.route('/ClubDetails', methods=['GET'])
def main4():
    id = request.args.get("idClub")
    id_user = request.args.get("idUser")
    dbcursor = DB.cursor()
    query = "SELECT * FROM Eventi WHERE id_club = %s"
    valori = (id,)
    dbcursor.execute(query,valori)
    row = dbcursor.fetchall()
    query = "SELECT * FROM Club WHERE id_club = %s"
    dbcursor.execute(query,valori)
    clubinf = dbcursor.fetchone()
    query = "SELECT * FROM Membership WHERE id_club = %s AND id_user = %s"
    valori2 = (id,id_user)
    dbcursor.execute(query,valori2)
    reg = dbcursor.fetchone()
    test = "No"
    if(reg):
        test = "Si"
    print(test)
    dbcursor.close()
    return jsonify({"Dettagli":row,"clubinf":clubinf,"QueryReg":test})

@app.route("/Iscrizione", methods=['GET'])
def iscrizione():
    id = request.args.get("idClub")
    id_user = request.args.get("idUser")
    print(id)
    dbcursor = DB.cursor()
    query = "INSERT INTO Membership VALUES (%s,%s)"
    sql = (id_user,id)
    dbcursor.execute(query,sql)
    dbcursor.close()
    DB.commit()
    return jsonify({"Dettagli":"ok"})

if __name__ == '__main__':
    app.run()


