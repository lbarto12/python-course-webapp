from src.dbutils import Database

from src.endpoints.general.user import user
from src.endpoints.function.problems import problems
from src.endpoints.function.compiler import compiler

def build(app):
    Database.start()

    # endpoints
    user(app)
    problems(app)
    compiler(app)
