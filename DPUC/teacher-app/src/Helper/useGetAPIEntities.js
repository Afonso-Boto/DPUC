import { useState, useEffect } from "react";
import useFetch from "./useFetch";

const useGetAPIEntities = () => {

    // Fetcher criação
    //const URL_UOS = "http://localhost:82/creation/uos";

    // JSON SERVER
    const URL_UOS = "http://localhost:8000/uos";
    const URL_AREAS = "http://localhost:8000/areas";
    const URL_CURSOS = "http://localhost:8000/cursos";
    const URL_IDIOMAS = "http://localhost:8000/idiomas";
    const URL_DOCENTES = "http://localhost:8000/docentes";
    
    const URL_MODALIDADES = "http://localhost:8000/modalidades";
    const URL_GRAUS = "http://localhost:8000/graus";
    const URL_SEMESTRE = "http://localhost:8000/semestres";
    const URL_DURACOES = "http://localhost:8000/duracoes";

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
    const [ grausOptions, setGraus ] = useState([]);
    const [ areasOptions, setAreas ] = useState([]);
    const [ idiomasOptions, setIdiomas ] = useState([]);
    const [ duracoesOptions, setDuracoes ] = useState([]);
    const [ semestreOptions, setSemestre ] = useState([]);
    const [ modalidadesOptions, setModalidades ] = useState([]);
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
    useEffect(() => {
        if(cursos === null)
            return;
        setCursos([]);
        cursos.map((c) => setCursos(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [cursos]);
    useEffect(() => {
        if(areas === null)
            return;
        setAreas([]);
        areas.map((c) => setAreas(old => [...old, {key: c.nome, text: c.sigla + " - " + c.nome, value: c.id}]));
    }, [areas]);
    useEffect(() => {
        if(duracoes === null)
            return;
        setDuracoes([]);
        duracoes.map((c) => setDuracoes(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [duracoes]);
    useEffect(() => {
        if(semestre === null)
            return;
        setSemestre([]);
        semestre.map((c) => setSemestre(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [semestre]);
    useEffect(() => {
        if(modalidades === null)
            return;
        setModalidades([]);
        modalidades.map((c) => setModalidades(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [modalidades]);
    useEffect(() => {
        if(graus === null)
            return;
        setGraus([]);
        graus.map((c) => setGraus(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [graus]);
    useEffect(() => {
        if(idiomas === null)
            return;
        setIdiomas([]);
        idiomas.map((c) => setIdiomas(old => [...old, {key: c.nome, text: c.nome, value: c.id}]));
    }, [idiomas]);

    return {retryFetch, setRetry, 
        uos, cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes,
        uosOptions, cursosOptions, grausOptions, areasOptions, idiomasOptions,  
        duracoesOptions, semestreOptions, modalidadesOptions, docentesOptions
    };
}


export default useGetAPIEntities;