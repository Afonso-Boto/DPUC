import { useState, useEffect, useContext } from "react";
import { EntitiesContext } from "../Helper/Context";

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
        const {cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes} = useContext(EntitiesContext);

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
            
            if(data.objetivos)
                setObjetivos(data.objetivos);
            if(data.horasContacto)
                setHorasOT(data.horasContacto);
            if(data.conteudos)
                setConteudos(data.conteudos);
            if(data.coerenciaConteudos)
                setCoerenciaConteudos(data.coerenciaConteudos);
            if(data.metodologias)
                setMetodologias(data.metodologias);
            if(data.coerenciaMetodologias)
                setCoerenciaMetodologias(data.coerenciaMetodologias);
            if(data.bibliografia)
                setBibliografia(data.bibliografia);
            if(data.observacoes)
                setObservacoes(data.observacoes);
            if(data.regimeFaltas)
                setRegFaltas(data.regimeFaltas);
            if(data.requisitos)
                setRequisitos(data.requisitos);
            if(data.ficheiros)
                setFicheiros(data.ficheiros);
            if(data.paginaPublica)
                setWebpage(data.paginaPublica);
            if(data.funcionamento)
                setFuncPratica(data.funcionamento);
            if(data.aprendizagem)
                setAprendizagemAtiva(data.aprendizagem);
            if(data.avaliacao)
                setTipoAvaliacao(data.avaliacao);
            if(data.dataAlteracao){
                const dataDPUC = data.dataAlteracao.split("-");
                setDataAlter(new Date(dataDPUC[0], dataDPUC[1]-1, dataDPUC[2]));
            }

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

            if(data.docentes && docentes){
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