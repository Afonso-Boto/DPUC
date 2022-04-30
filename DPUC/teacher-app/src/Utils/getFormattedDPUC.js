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

    var formattedCursos = ucCurso.join("$") + "$";
    var formattedLinguas = ucIdioma.join("$") + "$";
    var formattedDocentes = ucDocentes.join("$") + "$";
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

    return { designacao: data.designacao, areaCientifica: ucArea, duracao: ucDuracao,
        responsavel: data.responsavel, cargaHoraria: null, horasContacto: ucHorasOT,
        docentes: formattedDocentes, docentesHoras: formattedDocentesHoras,
        horasTrabalo: data.ects*27, ects: data.ects, objetivos: ucObjetivos,
        conteudos: ucConteudos, coerenciaConteudos: ucCoerenciaConteudos, metodologias: ucMetodologias,
        coerenciaMetodologias: ucCoerenciaMetodologias, bibliografia: ucBibliografia, observacoes: ucObservacoes,
        unidadeOrganica: data.unidadeOrganica,  cursos: formattedCursos, regimeFaltas: ucRegFaltas, 
        linguas: formattedLinguas, modalidade: ucModalidade, requisitos: ucRequisitos, ficheiros: ucFicheiros,
        paginaPublica: ucWebpage, funcionamento: ucFuncPratica, aprendizagem: ucAprendizagemAtiva,
        grau: ucGrau, avaliacao: ucTipoAvaliacao, periodo: ucSemestre,  
        dataAlteracao: dataAlt,  estado: status };
}
 
export default getFormattedDPUC;