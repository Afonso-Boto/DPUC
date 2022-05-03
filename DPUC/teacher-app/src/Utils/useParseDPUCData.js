import { useState, useEffect } from "react";

const useParseDPUCData = (data, 
    areas, 
    cursos, 
    graus, 
    idiomas, 
    duracoes, 
    semestre, 
    modalidades, 
    docentes,
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
            if(areas)
                setArea(areas.find((a) => (a.sigla === data.areaCientifica)));
            if(graus)
                setGrau(graus.find((g) => (g.nome === data.grau))); 
            if(duracoes)
                setDuracao(duracoes.find((d) => (d.nome === data.duracao)));
            if(semestre)
                setSemestre(semestre.find((s) => (s.nome === data.periodo)));
            if(modalidades)
                setModalidade(modalidades.find((m) => (m.nome === data.modalidade)));
            
            setObjetivos(data.objetivos);
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

            if(data.cursos && cursos){
                const c = data.cursos.split("$").filter((e) => e.length > 0);
                let cList = [];
                for(var ci = 0; ci < c.length; ci++)
                    cList.push(cursos.find((curso) => curso.nome === c[ci]));
                setCurso(cList);
            }
            if(data.linguas && idiomas){
                const l = data.linguas.split("$").filter((e) => e.length > 0);
                let lList = [];
                for(var li = 0; li < l.length; li++)
                    lList.push(idiomas.find((idioma) => idioma.nome === l[li]));
                setIdioma(lList);
            }


            if(data.docentes){
                const d = data.docentes.split("$").filter((e) => e.length > 0);
                let dList = [];
                for(var di = 0; di < d.length; di++)
                    dList.push(docentes.find((docente) => docente.cod_int.toString() === d[di]));
                setDocentes(dList);
            }

            if(data.docentesHoras){
                var parsedString = data.docentesHoras.split("$");
                for(var i = 0; i < parsedString.length; i++){
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