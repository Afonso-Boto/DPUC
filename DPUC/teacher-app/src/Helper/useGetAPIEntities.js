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
    
    // const URL_MODALIDADES = "http://localhost:8000/modalidades";
    // const URL_GRAUS = "http://localhost:8000/graus";
    // const URL_SEMESTRE = "http://localhost:8000/semestres";
    // const URL_DURACOES = "http://localhost:8000/duracoes";

    // If this number changes, API requests will be re-done
    const [ retryFetch, setRetry ] = useState(0);

    // All entities, unformatted
    const { data: uos } = useFetch(URL_UOS, retryFetch);
    const { data: cursos } = useFetch(URL_CURSOS, retryFetch);
    const { data: areas } = useFetch(URL_AREAS, retryFetch);
    const { data: idiomas } = useFetch(URL_IDIOMAS, retryFetch);
    const { data: docentes } = useFetch(URL_DOCENTES, retryFetch);

    // const { data: modalidades } = useFetch(URL_MODALIDADES, retryFetch);
    // const { data: graus } = useFetch(URL_GRAUS, retryFetch);
    // const { data: semestre } = useFetch(URL_SEMESTRE, retryFetch);
    // const { data: duracoes } = useFetch(URL_DURACOES, retryFetch);

    const modalidades = [
        { id: 1, nome: "Presencial" },
        { id: 2, nome: "Remoto" },
        { id: 3, nome: "Misto" }
      ];

    const graus = [
        { id: 1, nome: "Licenciatura", ciclo: 1 },
        { id: 2, nome: "Mestrado", ciclo: 2 },
        { id: 3, nome: "Doutoramento", ciclo: 3 }
      ];

    const semestre = [
        { id: 1, nome: "Primeiro" },
        { id: 2, nome: "Segundo" }
      ];

    const duracoes = [
        { id: 1, nome: "Semestral" },
        { id: 2, nome: "Anual" }
      ];

    return {retryFetch, setRetry, 
        uos, cursos, graus, areas, idiomas, 
        duracoes, semestre, modalidades, docentes,
    };
}


export default useGetAPIEntities;