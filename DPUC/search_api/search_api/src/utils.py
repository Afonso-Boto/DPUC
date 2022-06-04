from unidecode import unidecode
from ftfy import fix_text


def query_very_basic():
    return "SELECT uc.codigo as id, uc.designacao as nome, " \
           "ac.designacao as area_cientifica, dpuc.objetivos as objetivos, dpuc.conteudos as conteudos, " \
           "dpuc.bibliografia as bibliografia, dpuc.requisitos as requisitos, " \
           "dpuc.aprendizagem as aprendizagem FROM " \
           "dpuc JOIN uc ON dpuc.UCid = uc.id " \
           "JOIN unidade_organica as uo ON uc.unidade_organicaid = uo.id " \
           "JOIN ac ON uc.acid = ac.id;"

def get_fields():
    return "id", "nome", "area_cientifica", "objetivos", "conteudos", "bibliografia", "requisitos", "aprendizagem"

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


def format_keywords(keywords):
    words = keywords.split(" ")
    formatted_keywords = list()
    for word in words:
        word = unidecode(word).lower().strip()
        formatted_keywords.append(word)
    keywords = " ".join(formatted_keywords).strip()
    return keywords
