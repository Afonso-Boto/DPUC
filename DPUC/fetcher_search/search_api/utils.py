from unidecode import unidecode
import fetcher_search.env as env
from .log import get_logger

logger = get_logger("utils-module")


def query_very_basic():
    return "SELECT uc.codigo as id, uc.designacao as nome, " \
           "ac.designacao as area_cientifica, dpuc.objetivos as objetivos, dpuc.conteudos as conteudos, " \
           "dpuc.bibliografia as bibliografia, dpuc.requisitos as requisitos, " \
           "dpuc.aprendizagem as aprendizagem FROM " \
           "dpuc JOIN uc ON dpuc.UCid = uc.id " \
           "JOIN unidade_organica as uo ON uc.unidade_organicaid = uo.id " \
           "JOIN ac ON uc.acid = ac.id;"


def es_query(keywords):
    return {
        "multi_match": {
            "query": keywords,
            "fields": [
                "nome",
                "conteudos^2",
                "objetivos",
            ]
        }
    }


def row2dict(row):
    dicio = dict()
    dicio["id"] = int(row[0])
    dicio["nome"] = format_value(row[1])
    dicio["area_cientifica"] = format_value(row[2])
    dicio["objetivos"] = format_value(row[3])
    dicio["conteudos"] = format_value(row[4])
    dicio["bibliografia"] = format_value(row[5])
    dicio["requisitos"] = format_value(row[6])
    dicio["aprendizagem"] = format_value(row[7])
    return dicio


def format_value(value: str) -> str:
    logger.info(f"old value: {value}")
    value = unidecode(value).lower().strip()
    logger.info(f"new value: {value}")
    return value
