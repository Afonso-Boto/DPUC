import { useState, useEffect, useContext } from "react";
import { EntitiesContext } from "./Context";

const useGetDPUC = (data) => {
    const [unidade_organicaid, setUoid] = useState({});
    const [ACid, setACid] = useState({});

    const [designacao, setDesignacao] = useState("");
    const [estado, setEstado] = useState("");
    const [duracao, setDuracao] = useState([]);
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
    const [cursos, setCursos] = useState([]);
    const [regimeFaltas, setRegimeFaltas] = useState("");
    const [linguas, setLinguas] = useState("");
    const [modalidade, setModalidade] = useState([]);
    const [requisitos, setRequisitos] = useState("");
    const [ficheiros, setFicheiros] = useState("");
    const [paginaPublica, setPaginaPublica] = useState("");
    const [funcionamento, setFuncionamento] = useState("");
    const [aprendizagem, setAprendizagem] = useState("");
    const [grau, setGrau] = useState([]);
    const [avaliacao, setAvaliacao] = useState("");
    const [periodo, setPeriodo] = useState([]);
    const [dataAlteracao, setDataAlteracao] = useState("");
    const [unidadeOrganica, setUnidadeOrganica] = useState({});
    const [areaCientifica, setAreaCientifica] = useState([]);
    const [estadoTipo, setEstadoTipo] = useState(false);
    const [id, setId] = useState(false);


    const [error, setError] = useState(false);
    const [parsing, setParsing] = useState(false);
    const {cursos:entCursos, graus, areas, idiomas, duracoes, semestre, uos, estados, modalidades, docentes: entDocentes} = useContext(EntitiesContext);
    
    useEffect(() => {
        
        setParsing(true);
        setError(false);
        if(data){

            if(data.criacao_edicao)
                setEstadoTipo("E");
            else
                setEstadoTipo("C");
            if(data.id)
                setId(data.id);
            if(data.objetivos)
                setObjetivos(data.objetivos);
            if(data.horas_contacto)
                setHorasOT(data.horas_contacto);
            if(data.conteudos)
                setConteudos(data.conteudos);
            if(data.coerencia_conteudos)
                setCoerenciaConteudos(data.coerencia_conteudos);
            if(data.metodologias)
                setMetodologias(data.metodologias);
            if(data.coerencia_metodologias)
                setCoerenciaMetodologias(data.coerencia_metodologias);
            if(data.bibliografia)
                setBibliografia(data.bibliografia);
            if(data.observacoes)
                setObservacoes(data.observacoes);
            if(data.regime_faltas)
                setRegimeFaltas(data.regime_faltas);
            if(data.requisitos)
                setRequisitos(data.requisitos);
            if(data.ficheiros)
                setFicheiros(data.ficheiros);
            if(data.pagina_publica)
                setPaginaPublica(data.pagina_publica);
            if(data.funcionamento)
                setFuncionamento(data.funcionamento);
            if(data.aprendizagem)
                setAprendizagem(data.aprendizagem);
            if(data.avaliacao)
                setAvaliacao(data.avaliacao);
            if(data.designacao)
                setDesignacao(data.designacao);
            if(data.ucCodigo || data.ucCodigo === 0)
                setCodigo(data.ucCodigo);
            if(data.carga_horaria)
                setCargaHoraria(data.carga_horaria);
            
            if(data.ects){
                setEcts(data.ects);
                if(data.horas_trabalho)
                    setHorasTrabalho(data.horas_trabalho);
                else
                    setHorasTrabalho(data.ects * 27);
            }

            if(data.estadoid && estados){
                let estadoID = data.estadoid;
                switch(estadoID){
                    case 7:
                        estadoID = 1;
                        break;
                    case 8:
                        estadoID = 2;
                        break;
                    case 9:
                        estadoID = 4;
                        break;
                    case 10:
                        estadoID = 5;
                        break;
                    default:
                        break;
                }
                setEstado(estados.find((e) => (e.id === estadoID)));
            }

            if(data.sigla_ac && areas)
                setAreaCientifica(areas.find((a) => (a.id === data.sigla_ac)));
                
            if(data.grau && graus)
                setGrau(graus.find((g) => (g.nome === data.grau))); 

            if(data.duracao && duracoes){
                if(data.duracao !== "Semestral" && data.duracao !== "Anual")
                    setDuracao(duracoes.find((d) => (d.nome === "Semestral")));
                else
                    setDuracao(duracoes.find((d) => (d.nome === data.duracao)));
            }
            else
                setDuracao(duracoes.find((d) => (d.nome === "Semestral")));

            if(data.periodo_letivoid && semestre)
                setPeriodo(semestre.find((s) => (s.id === data.periodo_letivoid)));
            if(data.modalidade && modalidades)
                setModalidade(modalidades.find((m) => (m.nome === data.modalidade)));

            if(data.unidade_organicaid != null && uos)
                setUnidadeOrganica(uos.find((uo) => (uo.id === data.unidade_organicaid)));
            if(data.data_alteracao){
                const dataDPUC = data.data_alteracao.split("-");
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

            if(data.regenteID && entDocentes){
                setResponsavel(entDocentes.find((docente) => docente.id === data.regenteID));
            }

            if(data.docentes && entDocentes){
                const d = data.docentes.split("$").filter((e) => e.length > 0);
                let dList = [];
                for(var di = 0; di < d.length; di++)
                    dList.push(entDocentes.find((docente) => docente.id.toString() === d[di]));
                setDocentes(dList);
            }

            if(data.carga_horaria){
                var parsedString = data.carga_horaria.split("$");
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
        ACid,
        unidade_organicaid,

        designacao,
        estadoTipo,
        estado,
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
        dataAlteracao,
        unidadeOrganica,
        areaCientifica,
        id
    };

    const dpucSet = {
        setACid,
        setUoid,
        setDesignacao,
        setEstadoTipo,
        setEstado,
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
        setDataAlteracao,
        setUnidadeOrganica,
        setAreaCientifica,
        setId
    };

    return { error, parsing, dpuc, dpucSet }
}
 
export default useGetDPUC;