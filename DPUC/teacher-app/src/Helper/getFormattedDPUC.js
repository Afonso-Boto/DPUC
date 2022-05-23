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
    var data_alteracao = "" + date.getFullYear() + "-";
    data_alteracao += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
    data_alteracao += "-";
    data_alteracao += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());

    let formattedArea = null;
    if(dpuc.ACid)
        formattedArea = dpuc.ACid.sigla;
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
    if(dpuc.unidade_organicaid)
        formattedUnidadeOrganica = dpuc.unidade_organicaid.id;

    const codigoUC = 10000 + Math.floor(Math.random() * 90000);

    return { designacao: dpuc.designacao, 
        ACid: formattedArea, 
        duracao: formattedDuracao, 
        codigo: codigoUC,
        responsavel: formattedResponsavel, 
        carga_horaria: null, 
        horas_contacto: dpuc.horasOT,
        docentes: formattedDocentes,
        docentesHoras: formattedDocentesHoras,
        horas_trabalho: dpuc.ects*27, 
        ects: dpuc.ects, 
        objetivos: dpuc.objetivos,
        conteudos: dpuc.conteudos, 
        coerencia_conteudos: dpuc.coerencia_conteudos, 
        metodologias: dpuc.metodologias,
        coerencia_metodologia: dpuc.coerencia_metodologia, 
        bibliografia: dpuc.bibliografia, 
        observacoes: dpuc.observacoes,
        unidade_organicaid: formattedUnidadeOrganica,  
        cursos: formattedCursos, 
        regime_faltas: dpuc.regime_faltas, 
        linguas: formattedLinguas, 
        modalidade: formattedModalidade, 
        requisitos: dpuc.requisitos, 
        ficheiros: dpuc.ficheiros,
        pagina_publica: dpuc.pagina_publica, 
        funcionamento: dpuc.funcionamento, 
        aprendizagem: dpuc.aprendizagem,
        grau: formattedGrau, 
        avaliacao: dpuc.avaliacao, 
        periodo: formattedPeriodo,  
        data_alteracao: data_alteracao,  
        estado: status };
}
 
export default getFormattedDPUC;