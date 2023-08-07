from flask import request, jsonify
import sys
from io import StringIO
from ...dbutils import Database

def compiler(app):

    @app.route('/run', methods=['POST'])
    def run():
        out, err = StringIO(), StringIO()
        code = request.json["code"]
        sys.stdout = out
        sys.stderr = err
        try:
            exec(code)
        except Exception as e:
            print(e)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        return jsonify({"out": out.getvalue(), "err": err.getvalue()})

    @app.route('/submit', methods=['POST'])
    def submit():
        unit = request.json["unit"]
        page = request.json["page"]
        expected = Database.get(f"units/{unit}/pages")[page]["expected"]

        out, err = StringIO(), StringIO()
        code = request.json["code"]
        sys.stdout = out
        sys.stderr = err
        try:
            exec(code)
        except Exception as e:
            print(e)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        res = out.getvalue()
        return jsonify({
            "out": res, 
            "err": err.getvalue(), 
            "success": res.strip() == expected,
            "expected": expected
        })
        