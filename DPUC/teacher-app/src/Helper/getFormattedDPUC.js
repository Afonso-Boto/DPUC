import { useState, useEffect } from "react";

const getFormattedDPUC = (dpuc) => {

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


    const codigoUC = dpuc.codigo ? dpuc.codigo : null;

    const formattedDuracao = Array.isArray(dpuc.duracao) ? "" : dpuc.duracao.nome;
    const formattedModalidade = Array.isArray(dpuc.modalidade) ? "" : dpuc.modalidade.nome;
    const formattedGrau = Array.isArray(dpuc.grau) ? "" : dpuc.grau.nome;
    const formattedPeriodo = Array.isArray(dpuc.periodo) ? "" : dpuc.periodo.id;

    const formattedUnidadeOrganica = dpuc.unidadeOrganica ? dpuc.unidadeOrganica.id : null;
    const formattedResponsavel = dpuc.responsavel ? dpuc.responsavel.id : null;
    const formattedArea = dpuc.areaCientifica ? dpuc.areaCientifica.id : null;


    console.log(formattedResponsavel)
    console.log(codigoUC)
    console.log(formattedUnidadeOrganica)

    return { 
        criacao_edicao: dpuc.criacaoEdicao,
        id: dpuc.id,
        designacao: dpuc.designacao, 
        sigla_ac: formattedArea, 
        duracao: formattedDuracao, 
        ucCodigo: codigoUC,
        regenteID: formattedResponsavel, 
        carga_horaria: formattedDocentesHoras, 
        horas_contacto: dpuc.horasOT,
        docentes: formattedDocentes,
        horas_trabalho: dpuc.ects*27, 
        ects: dpuc.ects, 
        objetivos: dpuc.objetivos,
        conteudos: dpuc.conteudos, 
        coerencia_conteudos: dpuc.coerenciaConteudos, 
        metodologias: dpuc.metodologias,
        coerencia_metodologias: dpuc.coerenciaMetodologias, 
        bibliografia: dpuc.bibliografia, 
        observacoes: dpuc.observacoes,
        unidade_organicaid: formattedUnidadeOrganica,  
        cursos: formattedCursos, 
        regime_faltas: dpuc.regimeFaltas, 
        linguas: formattedLinguas, 
        modalidade: formattedModalidade, 
        requisitos: dpuc.requisitos, 
        ficheiros: dpuc.ficheiros,
        pagina_publica: dpuc.paginaPublica, 
        funcionamento: dpuc.funcionamento, 
        aprendizagem: dpuc.aprendizagem,
        grau: formattedGrau, 
        avaliacao: dpuc.avaliacao, 
        periodo_letivoid: formattedPeriodo,  
        data_alteracao: data_alteracao,  
        estadoid: dpuc.estado.id 
    };
}
 
export default getFormattedDPUC;