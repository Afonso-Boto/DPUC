import json
from bs4 import BeautifulSoup
from elasticsearch import Elasticsearch
import openpyxl
from pathlib import Path

path = Path("DPUC_2021.xlsx")
xlsx_file = openpyxl.load_workbook(path)
sheet = xlsx_file.active

dpucs = dict()

current_dpucid = None
for row in sheet.iter_rows(min_row=1):
    id = row[0].value
    if id == "codUC":
        continue
    if current_dpucid is None or current_dpucid != id:
        current_dpucid = id
        dpucs[current_dpucid] = dict()

        dpucs[current_dpucid]["nome"] = row[1].value
        dpucs[current_dpucid]["ano"] = row[2].value
        dpucs[current_dpucid]["semestre"] = row[3].value
        dpucs[current_dpucid]["ects"] = row[4].value
        dpucs[current_dpucid]["horas_trabalho"] = row[5].value
        dpucs[current_dpucid]["regime_faltas"] = row[6].value

    campo = row[9].value
    if campo:
        new_campo = row[7].value + "_" + row[8].value
        campo = campo.replace("&nbsp;", " ")
        campo = BeautifulSoup(campo, features="html.parser").get_text()
        dpucs[current_dpucid][new_campo] = campo

es = Elasticsearch(
    'http://localhost:9200/',
)

index_name = "index_dpucs"

if es.ping():
    print("Connection successful")
    if not es.indices.exists(index=index_name):
        print(f"Create index {index_name}")
        response = es.indices.create(index=index_name)
        print(response)
    print(f"index: {index_name}")
    for id in dpucs:
        print(f"create document in id {id}")
        es.create(index=index_name, id=id, document=dpucs[id])


lst = list()

for dpuc in dpucs:
    dicio = dpucs[dpuc]
    dicio["id"] = dpuc
    lst.append(dicio)

with open("dpuc_2021.json", "w") as jsonfile:
    json.dump(lst, jsonfile, ensure_ascii=False)