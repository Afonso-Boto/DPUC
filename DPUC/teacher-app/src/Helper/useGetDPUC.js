import { useState, useEffect, useContext } from "react";
import { EntitiesContext } from "./Context";

const useGetDPUC = (data) => {
        
    const [unidade_organicaid, setUoid] = useState({});
    const [ACid, setACid] = useState({});

    const [designacao, setDesignacao] = useState("");
    const [estado, setEstado] = useState("");
    const [duracao, setDuracao] = useState({});
    const [codigo, setCodigo] = useState("");
    const [responsavel, setResponsavel] = useState({});
    const [carga_horaria, setCarga_horaria] = useState(null); // Ainda não se sabe o que é isto
    const [horasOT, setHorasOT] = useState(0);
    const [horasTP, setHorasTP] = useState(0);
    const [horasT, setHorasT] = useState(0);
    const [horasP, setHorasP] = useState(0);
    const [docentes, setDocentes] = useState([]);
    const [horas_trabalho, setHoras_trabalho] = useState(0);
    const [ects, setEcts] = useState(0);
    const [objetivos, setObjetivos] = useState("");
    const [conteudos, setConteudos] = useState("");
    const [coerencia_conteudos, setCoerencia_conteudos] = useState("");
    const [metodologias, setMetodologias] = useState("");
    const [coerencia_metodologia, setCoerencia_metodologia] = useState("");
    const [bibliografia, setBibliografia] = useState("");
    const [observacoes, setObservacoes] = useState("");
    const [cursos, setCursos] = useState([]);
    const [regime_faltas, setRegime_faltas] = useState("");
    const [linguas, setLinguas] = useState([]);
    const [modalidade, setModalidade] = useState({});
    const [requisitos, setRequisitos] = useState("");
    const [ficheiros, setFicheiros] = useState("");
    const [pagina_publica, setPagina_publica] = useState("");
    const [funcionamento, setFuncionamento] = useState("");
    const [aprendizagem, setAprendizagem] = useState("");
    const [grau, setGrau] = useState([]);
    const [avaliacao, setAvaliacao] = useState({});
    const [periodo, setPeriodo] = useState({});
    const [data_alteracao, setData_alteracao] = useState("");
    const [unidadeOrganica, setUnidadeOrganica] = useState({});
    
    const [error, setError] = useState(false);
    const [parsing, setParsing] = useState(false);
    const {cursos:entCursos, graus, areas, idiomas, duracoes, semestre, uos, modalidades, docentes: entDocentes} = useContext(EntitiesContext);
    
    useEffect(() => {
        
        setParsing(true);
        setError(false);
        if(data){
            console.table(data);
            if(data.objetivos)
                setObjetivos(data.objetivos);
            if(data.estado)
                setEstado(data.estado);
            if(data.horas_contacto)
                setHorasOT(data.horas_contacto);
            if(data.conteudos)
                setConteudos(data.conteudos);
            if(data.coerencia_conteudos)
                setCoerencia_conteudos(data.coerencia_conteudos);
            if(data.metodologias)
                setMetodologias(data.metodologias);
            if(data.coerencia_metodologia)
                setCoerencia_metodologia(data.coerencia_metodologia);
            if(data.bibliografia)
                setBibliografia(data.bibliografia);
            if(data.observacoes)
                setObservacoes(data.observacoes);
            if(data.regime_faltas)
                setRegime_faltas(data.regime_faltas);
            if(data.requisitos)
                setRequisitos(data.requisitos);
            if(data.ficheiros)
                setFicheiros(data.ficheiros);
            if(data.pagina_publica)
                setPagina_publica(data.pagina_publica);
            if(data.funcionamento)
                setFuncionamento(data.funcionamento);
            if(data.aprendizagem)
                setAprendizagem(data.aprendizagem);
            if(data.avaliacao)
                setAvaliacao(data.avaliacao);
            if(data.designacao)
                setDesignacao(data.designacao);
            if(data.ucCodigo)
                setCodigo(data.ucCodigo);
            if(data.carga_horaria)
                setCarga_horaria(data.carga_horaria);
            if(data.horas_trabalho)
                setHoras_trabalho(data.horas_trabalho);
            if(data.ects)
                setEcts(data.ects);

            if(data.ACid && areas)
                setACid(areas.find((a) => (a.sigla === data.ACid)));
            if(data.grau && graus)
                setGrau(graus.find((g) => (g.nome === data.grau))); 
            if(data.duracao && duracoes)
                setDuracao(duracoes.find((d) => (d.nome === data.duracao)));
            if(data.periodo && semestre)
                setPeriodo(semestre.find((s) => (s.nome === data.periodo)));
            if(data.modalidade && modalidades)
                setModalidade(modalidades.find((m) => (m.nome === data.modalidade)));

            if(data.unidade_organicaid && uos)
                setUnidadeOrganica(uos.find((uo) => (uo.id === data.unidade_organicaid)));
            if(data.data_alteracao){
                const dataDPUC = data.data_alteracao.split("-");
                setData_alteracao(new Date(dataDPUC[0], dataDPUC[1]-1, dataDPUC[2]));
            }
            if(data.cursos && entCursos){
                const c = data.cursos.split("$").filter((e) => e.length > 0);
                let cList = [];
                for(var ci = 0; ci < c.length; ci++)
                    cList.push(entCursos.find((curso) => curso.nome === c[ci]));
                setCursos(cList);
            }

            console.log(cursos);
            console.log(grau);
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
        ACid,
        unidade_organicaid,

        designacao,
        estado,
        duracao,
        codigo,
        responsavel,
        carga_horaria,
        horasOT,
        horasTP,
        horasT,
        horasP,
        docentes,
        horas_trabalho,
        ects,
        objetivos,
        conteudos,
        coerencia_conteudos,
        metodologias,
        coerencia_metodologia,
        bibliografia,
        observacoes,
        cursos,
        regime_faltas,
        linguas,
        modalidade,
        requisitos,
        ficheiros,
        pagina_publica,
        funcionamento,
        aprendizagem,
        grau,
        avaliacao,
        periodo,
        data_alteracao,
        unidadeOrganica
    };

    const dpucSet = {
        setACid,
        setUoid,
        setDesignacao,
        setEstado,
        setDuracao,
        setCodigo,
        setResponsavel,
        setCarga_horaria,
        setHorasOT,
        setHorasTP,
        setHorasT,
        setHorasP,
        setDocentes,
        setHoras_trabalho,
        setEcts,
        setObjetivos,
        setConteudos,
        setCoerencia_conteudos,
        setMetodologias,
        setCoerencia_metodologia,
        setBibliografia,
        setObservacoes,
        setCursos,
        setRegime_faltas,
        setLinguas,
        setModalidade,
        setRequisitos,
        setFicheiros,
        setPagina_publica,
        setFuncionamento,
        setAprendizagem,
        setGrau,
        setAvaliacao,
        setPeriodo,
        setData_alteracao,
        setUnidadeOrganica
    };

    return { error, parsing, dpuc, dpucSet }
}
 
export default useGetDPUC;