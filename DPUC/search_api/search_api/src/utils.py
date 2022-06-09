from unidecode import unidecode
from ftfy import fix_text
from datetime import datetime


def query_very_basic():
    return "SELECT uc.codigo as id, uc.designacao as nome, " \
           "ac.designacao as area_cientifica, dpuc.objetivos as objetivos, dpuc.conteudos as conteudos, " \
           "dpuc.bibliografia as bibliografia FROM " \
           "dpuc JOIN uc ON dpuc.UCid = uc.id " \
           "JOIN unidade_organica as uo ON uc.unidade_organicaid = uo.id " \
           "JOIN ac ON uc.acid = ac.id;"


def get_fields():
    return "id", "nome", "area_cientifica", "objetivos", "conteudos", "bibliografia"


def es_query(keywords):
    return {
        "bool": {
            "should": [
                {"match": {"nome": keywords}},
                {"match": {"conteudos": keywords}},
                {"match": {"objetivos": keywords}}
            ]
        }
    }


def format_value(value: str) -> str:
    value = fix_text(value)
    value = unidecode(value).lower().strip()
    return value


def now():
    return datetime.now().timestamp()
