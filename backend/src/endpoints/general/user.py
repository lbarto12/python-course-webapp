from flask import request, jsonify, make_response
from ...dbutils import Database

def user(app):
    
    @app.route('/user/name', methods=['GET', 'POST'])
    def user_name():
        if request.method == 'POST':
            if not request.json.get("name"):
                return make_response(jsonify({"error": "No name provided"}), 400)
            Database.set("user/name", request.json["name"])
        return jsonify(Database.get("user/name"))
    
    @app.route('/user/stats', methods=['GET'])
    def user_stats():
        return jsonify(Database.get("stats"))