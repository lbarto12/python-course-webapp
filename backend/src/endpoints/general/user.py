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
    
    @app.route('/user/stats/completion', methods=['GET'])
    def user_stats_completion():
        units = Database.get("units")
        

        result = {
            "completed": 0,
            "total": 0,
            "units": {}
        }

        for name, unit in units.items():
            result["units"][name] = {
                "completed": 0,
                "total": 0,
                "id": unit["id"],
                "difficulty": unit["difficulty"],
            }
            for page in unit["pages"]:
                if page["completed"]:
                    result["completed"] += 1
                    result["units"][name]["completed"] += 1
                result["total"] += 1
                result["units"][name]["total"] += 1
        
        return jsonify(result)
    
    @app.route('/user/stats/nextlesson', methods=['GET'])
    def user_stats_nextlesson():
        units = Database.get("units")
        for name, unit in units.items():
            for i, page in enumerate(unit["pages"]):
                if not page["completed"]:
                    return jsonify({
                        "unit": name,
                        "page": i,
                        "page_name": page["title"],
                    })
        return jsonify(None)