import { useState, useEffect } from "react";

const getFormattedDPUC = (dpuc, status) => {

    var formattedCursos = "";
    for(var i = 0; i < dpuc.cursos.length; i++){
        formattedCursos += dpuc.cursos[i].nome + "$";
    }
    var formattedLinguas = "";
    for(i = 0; i < dpuc.linguas.length; i++){
        formattedLinguas += dpuc.linguas[i].nome + "$";
    }
    var formattedDocentes = "";
    for(i = 0; i < dpuc.docentes.length; i++){
        formattedDocentes += dpuc.docentes[i].cod_int + "$";
    }

    var formattedDocentesHoras = "";
    if(dpuc.horasTP > 0)
        formattedDocentesHoras += "TP:" + dpuc.horasTP + "H$";
    if(dpuc.horasT > 0)
        formattedDocentesHoras += "T:" + dpuc.horasT + "H$";
    if(dpuc.horasP > 0)
        formattedDocentesHoras += "P:" + dpuc.horasP + "H$";

    const date = new Date();
    var dataAlt = "" + date.getFullYear() + "-";
    dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
    dataAlt += "-";
    dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());

    let formattedArea = null;
    if(dpuc.areaCientifica)
        formattedArea = dpuc.areaCientifica.sigla;
    let formattedDuracao = null;
    if(dpuc.duracao)
        formattedDuracao = dpuc.duracao.nome;
    let formattedModalidade = null;
    if(dpuc.modalidade)
        formattedModalidade = dpuc.modalidade.nome;
    let formattedGrau = null;
    if(dpuc.grau)
        formattedGrau = dpuc.grau.nome;
    let formattedPeriodo = null;
    if(dpuc.periodo)
        formattedPeriodo = dpuc.periodo.nome;
    let formattedResponsavel = null;
    if(dpuc.responsavel)
        formattedResponsavel = dpuc.responsavel.cod_int;
    let formattedUnidadeOrganica = null;
    if(dpuc.unidadeOrganica)
        formattedUnidadeOrganica = dpuc.unidadeOrganica.id;

    const codigoUC = 10000 + Math.floor(Math.random() * 90000);

    return { designacao: dpuc.designacao, 
        areaCientifica: formattedArea, 
        duracao: formattedDuracao, 
        codigo: codigoUC,
        responsavel: formattedResponsavel, 
        cargaHoraria: null, 
        horasContacto: dpuc.horasOT,
        docentes: formattedDocentes, 
        docentesHoras: formattedDocentesHoras,
        horasTrabalho: dpuc.ects*27, 
        ects: dpuc.ects, 
        objetivos: dpuc.objetivos,
        conteudos: dpuc.conteudos, 
        coerenciaConteudos: dpuc.coerenciaConteudos, 
        metodologias: dpuc.metodologias,
        coerenciaMetodologias: dpuc.coerenciaMetodologias, 
        bibliografia: dpuc.bibliografia, 
        observacoes: dpuc.observacoes,
        unidadeOrganica: formattedUnidadeOrganica,  
        cursos: formattedCursos, 
        regimeFaltas: dpuc.regimeFaltas, 
        linguas: formattedLinguas, 
        modalidade: formattedModalidade, 
        requisitos: dpuc.requisitos, 
        ficheiros: dpuc.ficheiros,
        paginaPublica: dpuc.paginaPublica, 
        funcionamento: dpuc.funcionamento, 
        aprendizagem: dpuc.aprendizagem,
        grau: formattedGrau, 
        avaliacao: dpuc.avaliacao, 
        periodo: formattedPeriodo,  
        dataAlteracao: dataAlt,  
        estado: status };
}
 
export default getFormattedDPUC;