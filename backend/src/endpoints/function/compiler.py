from flask import request, jsonify
import sys
from io import StringIO
from ...dbutils import Database

def compiler(app):

    @app.route('/run', methods=['POST'])
    def run():
        out, err = StringIO(), StringIO()
        code = request.json["code"]
        code = code.replace('\n', '\n\t')
        if code:
            code = f"def __main_runner__():\n\t{code}\n__main_runner__()"
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
        if code:
            code = code.replace('\n', '\n\t')
            code = f"def __main_runner__():\n\t{code}\n__main_runner__()"
        sys.stdout = out
        sys.stderr = err

        case_results = []
        try:
            if type(expected) == list:
                total_out = ""
                for i, testcase in enumerate(expected):
                    _in = testcase["input"]
                    _out = testcase["output"]
                    total_out += _out + "\n"
                    _code = code.replace("$testcase", _in)
                    print("|EXEC|", end="")
                    exec(_code)
                    this_exec = out.getvalue().split("|EXEC|")[-1].strip()
                    case_results.append(this_exec == _out)
                    if this_exec != _out:
                        return jsonify({
                            "out": this_exec, 
                            "in": _in,
                            "results": case_results,
                            "testcase": i,
                            "err": err.getvalue(), 
                            "success": False,
                            "expected": _out
                        })
                expected = total_out.strip()
            else:
                exec(code)
        except Exception as e:
            print(e)
        sys.stdout = sys.__stdout__
        sys.stderr = sys.__stderr__

        res = out.getvalue().replace("|EXEC|", "")
        return jsonify({
            "out": res, 
            "err": err.getvalue(), 
            "success": res.strip() == expected,
            "expected": expected,
            "results": case_results
        })
        