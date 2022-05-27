from unidecode import unidecode


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
    dicio["id"] = row[0]
    dicio["nome"] = unidecode(row[1]).lower().strip()
    dicio["area_cientifica"] = unidecode(row[2]).lower().strip()
    dicio["objetivos"] = unidecode(row[3]).lower().strip()
    dicio["conteudos"] = unidecode(row[4]).lower().strip()
    dicio["bibliografia"] = unidecode(row[5]).lower().strip()
    dicio["requisitos"] = unidecode(row[6]).lower().strip()
    dicio["aprendizagem"] = unidecode(row[7]).lower().strip()
    print(f"aqui aqui aqui: {dicio}")
    return dicio