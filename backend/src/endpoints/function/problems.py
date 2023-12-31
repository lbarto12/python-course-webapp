from flask import jsonify, request, make_response
import copy
from ...dbutils import Database


def problems(app):

    @app.route('/units/list', methods=['GET'])
    def units_list():
        return jsonify(Database.get("units"))
    
    @app.route('/units/get', methods=['POST'])
    def units_get():
        if not request.json.get("id"):
            return make_response(jsonify({"error": "No ID provided"}), 400)
        problems = Database.get("units")
        problem = problems[request.json["id"]]
        result = copy.deepcopy(problem)
        for i, page in enumerate(problem["pages"]):
            path = f"src/info/units/{request.json['id']}/{problem['pages'][i]['title']}.html"
            with open(path, "r") as f:
                result["pages"][i]["description"] = f.read()
        return jsonify(result)
    
    @app.route('/units/page/complete', methods=['POST'])
    def units_page_complete():
        print(request.json)
        if not request.json.get("unit"):
            return make_response(jsonify({"error": "No unit provided"}), 400)
        if request.json.get("page") is None:
            return make_response(jsonify({"error": "No page provided"}), 400)
        pages = Database.get(f"units/{request.json['unit']}/pages")
        pages[request.json["page"]]["completed"] = True
        Database.save()
        return jsonify({"success": True})