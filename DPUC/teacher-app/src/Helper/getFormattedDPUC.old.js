import { useState, useEffect } from "react";

const getFormattedDPUC = (data,
                status,
                ucArea,
                ucDuracao,
                ucSemestre,
                ucModalidade,
                ucGrau,
                ucCurso,
                ucIdioma,
                ucDocentes,
                ucHorasTP,
                ucHorasT,
                ucHorasP,
                ucHorasOT,
                ucObjetivos,
                ucWebpage,
                ucRequisitos,
                ucConteudos,
                ucCoerenciaConteudos,
                ucMetodologias,
                ucCoerenciaMetodologias,
                ucRegFaltas,
                ucFuncPratica,
                ucAprendizagemAtiva,
                ucTipoAvaliacao,
                ucBibliografia,
                ucFicheiros,
                ucObservacoes) => {

    var formattedCursos = "";
    for(var i = 0; i < ucCurso.length; i++){
        formattedCursos += ucCurso[i].nome + "$";
    }
    var formattedLinguas = "";
    for(i = 0; i < ucIdioma.length; i++){
        formattedLinguas += ucIdioma[i].nome + "$";
    }
    var formattedDocentes = "";
    for(i = 0; i < ucDocentes.length; i++){
        formattedDocentes += ucDocentes[i].cod_int + "$";
    }

    var formattedDocentesHoras = "";
    if(ucHorasTP > 0)
        formattedDocentesHoras += "TP:" + ucHorasTP + "H$";
    if(ucHorasT > 0)
        formattedDocentesHoras += "T:" + ucHorasT + "H$";
    if(ucHorasP > 0)
        formattedDocentesHoras += "P:" + ucHorasP + "H$";

    const date = new Date();
    var dataAlt = "" + date.getFullYear() + "-";
    dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
    dataAlt += "-";
    dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());

    let formattedArea = null;
    let formattedDuracao = null;
    let formattedModalidade = null;
    let formattedGrau = null;
    let formattedPeriodo = null;
    if(ucArea)
        formattedArea = ucArea.sigla;
    if(ucDuracao)
        formattedDuracao = ucDuracao.nome;
    if(ucModalidade)
        formattedModalidade = ucModalidade.nome;
    if(ucGrau)
        formattedGrau = ucGrau.nome;
    if(ucSemestre)
        formattedPeriodo = ucSemestre.nome;

    const codigoUC = 10000 + Math.floor(Math.random() * 90000);

    return { designacao: data.designacao, areaCientifica: formattedArea, duracao: formattedDuracao, codigo: codigoUC,
        responsavel: data.responsavel, cargaHoraria: null, horasContacto: ucHorasOT,
        docentes: formattedDocentes, docentesHoras: formattedDocentesHoras,
        horasTrabalho: data.ects*27, ects: data.ects, objetivos: ucObjetivos,
        conteudos: ucConteudos, coerenciaConteudos: ucCoerenciaConteudos, metodologias: ucMetodologias,
        coerenciaMetodologias: ucCoerenciaMetodologias, bibliografia: ucBibliografia, observacoes: ucObservacoes,
        unidadeOrganica: data.unidadeOrganica,  cursos: formattedCursos, regimeFaltas: ucRegFaltas, 
        linguas: formattedLinguas, modalidade: formattedModalidade, requisitos: ucRequisitos, ficheiros: ucFicheiros,
        paginaPublica: ucWebpage, funcionamento: ucFuncPratica, aprendizagem: ucAprendizagemAtiva,
        grau: formattedGrau, avaliacao: ucTipoAvaliacao, periodo: formattedPeriodo,  
        dataAlteracao: dataAlt,  estado: status };
}
 
export default getFormattedDPUC;