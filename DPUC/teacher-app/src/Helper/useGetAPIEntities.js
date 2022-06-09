import { useState } from "react";
import useFetch from "./useFetch";

const useGetAPIEntities = () => {

    // Fetcher criação
    const URL_UOS = "http://localhost:82/creation/uos";
    const URL_CURSOS = "http://localhost:82/creation/cursos";
    const URL_DOCENTES = "http://localhost:82/creation/docentes";
    const URL_ESTADOS = "http://localhost:82/creation/estados";
    
    const URL_AREAS = "http://localhost:82/creation/acs";
    
    // JSON SERVER
    // const URL_AREAS = "http://localhost:8000/areas";
    // const URL_MODALIDADES = "http://localhost:8000/modalidades";
    // const URL_GRAUS = "http://localhost:8000/graus";
    // const URL_SEMESTRE = "http://localhost:8000/semestres";
    // const URL_DURACOES = "http://localhost:8000/duracoes";
    // const URL_IDIOMAS = "http://localhost:8000/idiomas";

    // If this number changes, API requests will be re-done
    const [ retryFetch, setRetry ] = useState(0);

    // All entities, unformatted
    const { data: uos } = useFetch(URL_UOS, retryFetch);
    const { data: cursos } = useFetch(URL_CURSOS, retryFetch);
    const { data: areas } = useFetch(URL_AREAS, retryFetch);
    const { data: docentes } = useFetch(URL_DOCENTES, retryFetch);
    const { data: estados } = useFetch(URL_ESTADOS, retryFetch);
    
    //const { data: idiomas } = useFetch(URL_IDIOMAS, retryFetch);

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

    const idiomas = [
      { id: 1, nome: "Português" },
      { id: 2, nome: "Inglês" },
      { id: 3, nome: "Espanhol" },
      { id: 3, nome: "Alemão" },
    ];

    return {retryFetch, setRetry, 
        uos, cursos, graus, areas, idiomas, 
        duracoes, semestre, modalidades, docentes,
        estados
    };
}


export default useGetAPIEntities;