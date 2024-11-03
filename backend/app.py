from flask import Flask, jsonify, request
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from pymongo import MongoClient
import mysql.connector
import subprocess
import requests

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "abcd@1234"
jwt = JWTManager(app)

CORS(app)

mongo_client = MongoClient("mongodb://localhost:27017/")
mongo_db = mongo_client["sms_management"]
mongo_collection = mongo_db["configurations"]

mysql_conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="password",
    database="sms_metrics"
)
mysql_cursor = mysql_conn.cursor()

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    if data["username"] == "admin" and data["password"] == "password":
        access_token = create_access_token(identity=data["username"])
        return jsonify(access_token=access_token)
    return jsonify({"msg": "Invalid credentials"}), 401

@app.route("/session/<action>/<program>", methods=["POST"])
@jwt_required()
def manage_session(action, program):
    if action in ["start", "stop", "restart"]:
        cmd = f"screen -S {program} -{action[0].upper()}"
        subprocess.call(cmd, shell=True)
        return jsonify({"status": f"{action}ed {program} successfully"})
    return jsonify({"error": "Invalid action"}), 400

@app.route("/country-operator", methods=["POST"])
@jwt_required()
def add_country_operator():
    data = request.json
    mongo_collection.insert_one(data)
    return jsonify({"status": "Country-operator added"})

@app.route("/metrics", methods=["GET"])
@jwt_required()
def get_metrics():
    mysql_cursor.execute("SELECT * FROM sms_metrics")
    result = mysql_cursor.fetchall()
    return jsonify(result)


def send_telegram_alert(message):
    requests.post("https://api.telegram.org/bot<token>/sendMessage", data={
        "chat_id": "<chat_id>",
        "text": message
    })

if __name__ == "__main__":
    app.run(debug=True)
