import { useState, useEffect } from "react";

const useParseDPUCData = (data, 
    setArea,
    setDuracao,
    setSemestre,
    setModalidade,
    setGrau,
    setCurso,
    setIdioma,
    setDocentes,
    setHorasTP,
    setHorasT,
    setHorasP,
    setHorasOT,
    setObjetivos,
    setWebpage,
    setRequisitos,
    setConteudos,
    setCoerenciaConteudos, 
    setMetodologias,
    setCoerenciaMetodologias,
    setRegFaltas,
    setFuncPratica,
    setAprendizagemAtiva,
    setTipoAvaliacao,
    setBibliografia,
    setFicheiros,
    setObservacoes, 
    setDataAlter) => {
    const [error, setError] = useState(false);
    const [parsing, setParsing] = useState(false);

    useEffect(() => {
        setParsing(true);
        setError(false);
        if(data){
            setArea(data.areaCientifica);
            setObjetivos(data.objetivos);
            setDuracao(data.setDuracao);
            setHorasOT(data.horasContacto);
            setConteudos(data.conteudos);
            setCoerenciaConteudos(data.coerenciaConteudos);
            setMetodologias(data.metodologias);
            setCoerenciaMetodologias(data.coerenciaMetodologias);
            setBibliografia(data.bibliografia);
            setObservacoes(data.observacoes);
            setRegFaltas(data.regimeFaltas);
            setRequisitos(data.requisitos);
            setFicheiros(data.ficheiros);
            setWebpage(data.paginaPublica);
            setFuncPratica(data.funcionamento);
            setAprendizagemAtiva(data.aprendizagem);
            setTipoAvaliacao(data.avaliacao);
            setSemestre(data.periodo);
            setModalidade(data.modalidade);

            setGrau(data.grau); 
            if(data.cursos)
                setCurso(data.cursos.split("$").filter((e) => e.length > 0));
            if(data.linguas)
                setIdioma(data.linguas.split("$").filter((e) => e.length > 0));
            if(data.docentes)
                setDocentes(data.docentes.split("$").filter((e) => e.length > 0));

            if(data.docentesHoras){
                var parsedString = data.docentesHoras.split("$");
                for(var i = 0; i < parsedString.length; i++){
                    console.log(parsedString[i]);
                    if((parsedString[i]).includes("TP"))
                        setHorasTP(parsedString[i].substring(3,4));
                    else{
                        if((parsedString[i]).includes("T"))
                            setHorasT(parsedString[i].substring(2,3));
                        if((parsedString[i]).includes("P"))
                            setHorasP(parsedString[i].substring(2,3));
                    }
                }
            }
        }
        setParsing(false);
    }, [data]);    

    return { error, parsing }
}
 
export default useParseDPUCData;