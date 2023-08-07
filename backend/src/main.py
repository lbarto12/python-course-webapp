from flask import Flask, jsonify, request
from flask_cors import CORS
from src.build import build

from src.dbutils import Database

app = Flask(__name__)
cors = CORS(app)

@app.route('/', methods=['GET'])
def home():
    response = jsonify("Hello World")
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response




if __name__ == '__main__':
    build(app)
    app.run(host="0.0.0.0", port=8080, debug=True)