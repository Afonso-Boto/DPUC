import json
from bs4 import BeautifulSoup
import openpyxl
from pathlib import Path
import unidecode


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

        nome = row[1].value
        nome = nome.strip().lower()
        nome = unidecode.unidecode(nome)
        dpucs[current_dpucid]["nome"] = nome

        dpucs[current_dpucid]["semestre"] = 

    if row[8].value == "en":
        continue

    campo = row[9].value
    if campo:
        campo = campo.replace("&nbsp;", " ")
        campo = BeautifulSoup(campo, features="html.parser").get_text()
        campo = campo.strip().lower()
        campo = unidecode.unidecode(campo)
        if campo:
            new_campo = row[7].value.lower()
            if new_campo == "aprendizagemativa":
                new_campo = "aprendizagem"
            elif new_campo == "coerenciametodologias":
                new_campo = "coerencia_metodologias"
            elif new_campo == "coerenciaconteudos":
                new_campo = "coerencia_conteudos"
            dpucs[current_dpucid][new_campo] = campo

lst = list()

observacoes = set()
token_obs = "observacoes"

obs_irrelevantes = [
    "nao se aplica", "nao aplicavel", "nada a constatar", "sem observacoes", "nada mais a adicionar",
    "nao ha observacoes", "nada", "n/a", "nd", "nao existem observacoes", "n.a", "nada a referir", "nada a declarar",
    "none", "na", "nada a assinalar", "nao tem", "nada a referiri", "nao se aplica", "wev2", "n.d", "sans effet",
    "nada de relevante", "n. a", "nada a acrescentar", "x", "nao ha", "nada assinalavel", "sem obs", "nenhuma",
    "not applicable", "not applied", "nao ha observacoes adicionais", "nao existem", "(nao aplicavel)"
]

for dpuc in dpucs:
    dicio = dpucs[dpuc]
    dicio["id"] = dpuc
    if token_obs in dicio:
        obs = dicio[token_obs]
        obs = unidecode.unidecode(obs.lower())
        obs = obs.rstrip(".")
        obs = obs.rstrip("-")
        obs = obs.rstrip("_")
        obs = obs.strip()
        if len(obs) == 0 or obs in obs_irrelevantes:
            dicio.pop(token_obs)
    if token_obs in dicio:
        observacoes.add(dicio[token_obs])
    lst.append(dicio)

with open("dpuc.json", "w") as jsonfile:
    json.dump(lst, jsonfile, ensure_ascii=False)

for obs in observacoes:
    print(f" - {obs}")

print(f"len: {len(observacoes)}")
