import { useState, useEffect, useContext } from "react";
import { EntitiesContext } from "./Context";

const useGetDPUC = (data) => {
        
    const [designacao, setDesignacao] = useState("");
    const [areaCientifica, setAreaCientifica] = useState({});
    const [duracao, setDuracao] = useState({});
    const [codigo, setCodigo] = useState("");
    const [responsavel, setResponsavel] = useState({});
    const [cargaHoraria, setCargaHoraria] = useState(null); // Ainda não se sabe o que é isto
    const [horasOT, setHorasOT] = useState(0);
    const [horasTP, setHorasTP] = useState(0);
    const [horasT, setHorasT] = useState(0);
    const [horasP, setHorasP] = useState(0);
    const [docentes, setDocentes] = useState([]);
    const [horasTrabalho, setHorasTrabalho] = useState(0);
    const [ects, setEcts] = useState(0);
    const [objetivos, setObjetivos] = useState("");
    const [conteudos, setConteudos] = useState("");
    const [coerenciaConteudos, setCoerenciaConteudos] = useState("");
    const [metodologias, setMetodologias] = useState("");
    const [coerenciaMetodologias, setCoerenciaMetodologias] = useState("");
    const [bibliografia, setBibliografia] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [unidadeOrganica, setUnidadeOrganica] = useState({});
    const [cursos, setCursos] = useState([]);
    const [regimeFaltas, setRegimeFaltas] = useState("");
    const [linguas, setLinguas] = useState([]);
    const [modalidade, setModalidade] = useState({});
    const [requisitos, setRequisitos] = useState("");
    const [ficheiros, setFicheiros] = useState("");
    const [paginaPublica, setPaginaPublica] = useState("");
    const [funcionamento, setFuncionamento] = useState("");
    const [aprendizagem, setAprendizagem] = useState("");
    const [grau, setGrau] = useState({});
    const [avaliacao, setAvaliacao] = useState({});
    const [periodo, setPeriodo] = useState({});
    const [dataAlteracao, setDataAlteracao] = useState("");
    
    const [error, setError] = useState(false);
    const [parsing, setParsing] = useState(false);
    const {cursos:entCursos, graus, areas, idiomas, duracoes, semestre, uos, modalidades, docentes: entDocentes} = useContext(EntitiesContext);
    
    useEffect(() => {
        
        setParsing(true);
        setError(false);
        if(data){
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
                setRegimeFaltas(data.regimeFaltas);
            if(data.requisitos)
                setRequisitos(data.requisitos);
            if(data.ficheiros)
                setFicheiros(data.ficheiros);
            if(data.paginaPublica)
                setPaginaPublica(data.paginaPublica);
            if(data.funcionamento)
                setFuncionamento(data.funcionamento);
            if(data.aprendizagem)
                setAprendizagem(data.aprendizagem);
            if(data.avaliacao)
                setAvaliacao(data.avaliacao);
            if(data.designacao)
                setDesignacao(data.designacao);
            if(data.codigo)
                setCodigo(data.codigo);
            if(data.cargaHoraria)
                setCargaHoraria(data.cargaHoraria);
            if(data.horasTrabalho)
                setHorasTrabalho(data.horasTrabalho);
            if(data.ects)
                setEcts(data.ects);

            if(data.areaCientifica && areas)
                setAreaCientifica(areas.find((a) => (a.sigla === data.areaCientifica)));
            if(data.grau && graus)
                setGrau(graus.find((g) => (g.nome === data.grau))); 
            if(data.duracao && duracoes)
                setDuracao(duracoes.find((d) => (d.nome === data.duracao)));
            if(data.periodo && semestre)
                setPeriodo(semestre.find((s) => (s.nome === data.periodo)));
            if(data.modalidade && modalidades)
                setModalidade(modalidades.find((m) => (m.nome === data.modalidade)));
            if(data.unidadeOrganica && uos)
                setUnidadeOrganica(uos.find((uo) => (uo.nome === data.unidadeOrganica)));
            
            if(data.dataAlteracao){
                const dataDPUC = data.dataAlteracao.split("-");
                setDataAlteracao(new Date(dataDPUC[0], dataDPUC[1]-1, dataDPUC[2]));
            }

            if(data.cursos && entCursos){
                const c = data.cursos.split("$").filter((e) => e.length > 0);
                let cList = [];
                for(var ci = 0; ci < c.length; ci++)
                    cList.push(entCursos.find((curso) => curso.nome === c[ci]));
                setCursos(cList);
            }

            if(data.linguas && idiomas){
                const l = data.linguas.split("$").filter((e) => e.length > 0);
                let lList = [];
                for(var li = 0; li < l.length; li++)
                    lList.push(idiomas.find((idioma) => idioma.nome === l[li]));
                setLinguas(lList);
            }

            if(data.responsavel && entDocentes){
                setResponsavel(entDocentes.find((docente) => docente.cod_int.toString() === data.responsavel));
            }

            if(data.docentes && entDocentes){
                const d = data.docentes.split("$").filter((e) => e.length > 0);
                let dList = [];
                for(var di = 0; di < d.length; di++)
                    dList.push(entDocentes.find((docente) => docente.cod_int.toString() === d[di]));
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

    const dpuc = {
        designacao, 
        areaCientifica,
        duracao,
        codigo,
        responsavel,
        cargaHoraria,
        horasOT,
        horasTP,
        horasT,
        horasP,
        docentes,
        horasTrabalho,
        ects,
        objetivos,
        conteudos,
        coerenciaConteudos,
        metodologias,
        coerenciaMetodologias,
        bibliografia,
        observacoes,
        unidadeOrganica,
        cursos,
        regimeFaltas,
        linguas,
        modalidade,
        requisitos,
        ficheiros,
        paginaPublica,
        funcionamento,
        aprendizagem,
        grau,
        avaliacao,
        periodo,
        dataAlteracao   
    };

    const dpucSet = {
        setDesignacao,
        setAreaCientifica,
        setDuracao,
        setCodigo,
        setResponsavel,
        setCargaHoraria,
        setHorasOT,
        setHorasTP,
        setHorasT,
        setHorasP,
        setDocentes,
        setHorasTrabalho,
        setEcts,
        setObjetivos,
        setConteudos,
        setCoerenciaConteudos,
        setMetodologias,
        setCoerenciaMetodologias,
        setBibliografia,
        setObservacoes,
        setUnidadeOrganica,
        setCursos,
        setRegimeFaltas,
        setLinguas,
        setModalidade,
        setRequisitos,
        setFicheiros,
        setPaginaPublica,
        setFuncionamento,
        setAprendizagem,
        setGrau,
        setAvaliacao,
        setPeriodo,
        setDataAlteracao
    };

    return { error, parsing, dpuc, dpucSet }
}
 
export default useGetDPUC;