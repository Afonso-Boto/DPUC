import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useGetAPIEntities = () => {
    const URL_UOS = "http://localhost:8000/uos";
    const URL_AREAS = "http://localhost:8000/areas";
    const URL_CURSOS = "http://localhost:8000/cursos";
    const URL_DURACOES = "http://localhost:8000/duracoes";
    const URL_SEMESTRE = "http://localhost:8000/semestres";
    const URL_MODALIDADES = "http://localhost:8000/modalidades";
    const URL_GRAUS = "http://localhost:8000/graus";
    const URL_IDIOMAS = "http://localhost:8000/idiomas";
    const URL_DOCENTES = "http://localhost:8000/docentes";

    // If this number changes, API requests will be re-done
    const [ retryFetch, setRetry ] = useState(0);

    // All entities, unformatted
    const { data: uos } = useFetch(URL_UOS, retryFetch);
    const { data: cursos } = useFetch(URL_CURSOS, retryFetch);
    const { data: graus } = useFetch(URL_GRAUS, retryFetch);
    const { data: areas } = useFetch(URL_AREAS, retryFetch);
    const { data: idiomas } = useFetch(URL_IDIOMAS, retryFetch);
    const { data: duracoes } = useFetch(URL_DURACOES, retryFetch);
    const { data: semestre } = useFetch(URL_SEMESTRE, retryFetch);
    const { data: modalidades } = useFetch(URL_MODALIDADES, retryFetch);
    const { data: docentes } = useFetch(URL_DOCENTES, retryFetch);

    // formatted entities
    const [ uosOptions, setUOS ] = useState([]);
    const [ cursosOptions, setCursos ] = useState([]);
    const [ grausOptions, setgraus ] = useState([]);
    const [ areasOptions, setareas ] = useState([]);
    const [ idiomasOptions, setidiomas ] = useState([]);
    const [ duracoesOptions, setduracoes ] = useState([]);
    const [ semestreOptions, setsemestre ] = useState([]);
    const [ modalidadesOptions, setmodalidades ] = useState([]);
    const [ docentesOptions, setDocentes ] = useState([]);
    
    useEffect(() => {
        if(docentes === null)
            return;
        setDocentes([]);
        docentes.map((docente) => setDocentes(old => [...old, {key: docente.nome_completo, text: docente.nome_completo, value: docente.cod_int}]));
    }, [docentes]);
    useEffect(() => {
        if(uos === null)
            return;
        setUOS([]);
        uos.map((uo) => setUOS(old => [...old, {key: uo.nome, text: uo.sigla + " - " + uo.nome, value: uo.id}]));
    }, [uos]);

    return {retryFetch, setRetry, 
        uos, cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes,
        uosOptions, cursosOptions, grausOptions, areasOptions, idiomasOptions,  
        duracoesOptions, semestreOptions, modalidadesOptions, docentesOptions
    };
}


export default useGetAPIEntities;