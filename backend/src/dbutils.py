from typing import Any, Dict, List, Optional, Union
import json

class Database:
    DATA = None
    PATH = "src/database.json"

    @staticmethod
    def start():
        with open(Database.PATH, "r") as f:
            Database.DATA = json.load(f)


    @staticmethod
    def save() -> None:
        with open(Database.PATH, "w") as f:
            json.dump(Database.DATA, f, indent=4)
    
    @staticmethod
    def __set(collection: any, keys: List[str], value: Any):
        if len(keys) == 1:
            collection[keys[0]] = value
        else:
            Database.__set(collection[keys[0]], keys[1:], value)

    @staticmethod
    def set(path: str, value: Any) -> None:
        pt = path.split("/")
        Database.__set(Database.DATA, pt, value)
        Database.save()

    @staticmethod
    def get(path: str) -> Any:
        pt = path.split("/")
        return Database.__get(Database.DATA, pt)
    
    @staticmethod
    def __get(collection: any, keys: List[str]) -> Any:
        if len(keys) == 1:
            return collection[keys[0]]
        else:
            return Database.__get(collection[keys[0]], keys[1:])