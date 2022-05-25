from elasticsearch import Elasticsearch
import logging
import fetcher_search.env as env
import json
from pathlib import Path
import os

INDEX_NAME = env.INDEX_NAME
URL = "http://" + env.ES_HOST + ":" + env.ES_PORT

logging.basicConfig(
    level=logging.DEBUG,
    format="%(asctime)s %(name)-12s %(levelname)-8s %(message)s",
    datefmt="%m-%d %H:%M:%S",
)

logger = logging.getLogger("Elastic Search Connector")


def connect():
    es = Elasticsearch(URL)
    if es.ping():
        if not es.indices.exists(index=env.INDEX_NAME):
            logger.info(f"Connection {URL} successful")
            es.indices.create(index=env.INDEX_NAME)
        count = es.count(index=INDEX_NAME)["count"]
        if count == 0:
            logger.info("Populate index")
            dpucs = get_data02()
            for id in dpucs:
                es.create(index=INDEX_NAME, id=id, document=dpucs[id])
        return es
    else:
        return None


def get_relevant_search(conn: Elasticsearch, keywords: list=None) -> list:
    query = None
    if len(keywords) >= 1:
        query = {
            "multi_match": {
                "query": keywords,
                "fields": [
                    "nome",
                    "Conteudos^2",
                    "Objetivos",
                ]
            }
        }
    docs = conn.search(index=INDEX_NAME, query=query)['hits']['hits']
    formated_docs = list()
    for doc in docs:
        new_doc = doc["_source"]
        new_doc["id"] = doc["_id"]
        formated_docs.append(new_doc)
    return formated_docs


def get_data() -> dict:
    pass


def get_data02() -> dict:
    filename = os.path.join(Path(__file__).parent, "dpuc.json")
    dpucs = dict()
    with open(filename, "r") as file:
        lst = json.load(file)
        for elem in lst:
            iduc = elem["id"]
            elem.pop("id")
            elem.pop("AprendizagemAtiva_en", None)
            elem.pop("Avaliacao_en", None)
            elem.pop("Atividades_en", None)
            elem.pop("Metodologias_en", None)
            elem.pop("Metodologias_en", None)
            elem.pop("CoerenciaConteudos_en", None)
            elem.pop("Conteudos_en", None)
            elem.pop("Requisitos_en", None)
            elem.pop("Objetivos_en", None)
            elem.pop("Bibliografia_en", None)
            elem.pop("CoerenciaMetodologias_en", None)
            dpucs[iduc] = elem
    return dpucs

