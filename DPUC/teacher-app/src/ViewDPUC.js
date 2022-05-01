import { ContentContainer, Input, Select, Text, Button, AnimatedBackground } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ViewDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = "http://localhost:8000/dpuc/" + id;

    const URL_UOS = "http://localhost:8000/uos";

    const URL_AREAS = "http://localhost:8000/areas";
    const URL_CURSOS = "http://localhost:8000/cursos";
    const URL_DURACOES = "http://localhost:8000/duracoes";
    const URL_SEMESTRE = "http://localhost:8000/semestres";
    const URL_MODALIDADES = "http://localhost:8000/modalidades";
    const URL_GRAUS = "http://localhost:8000/graus";
    const URL_IDIOMAS = "http://localhost:8000/idiomas";
    const URL_DOCENTES = "http://localhost:8000/docentes";

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    const { data: dpuc , loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    const { data: uos , loading: loadUOS, error: errorUOS } = useFetch(URL_UOS);
    const { data: areas , loading: loadAreas, error: errorAreas } = useFetch(URL_AREAS);
    const { data: docentes , loading: loadDocentes, error: errorDocentes } = useFetch(URL_DOCENTES);
    //const { data: cursos , loading: loadCursos, error: errorCursos } = useFetch(URL_CURSOS);
    // const { data: graus , loading: loadGraus, error: errorGraus } = useFetch(URL_GRAUS);
    // const { data: idiomas , loading: loadIdiomas, error: errorIdiomas } = useFetch(URL_IDIOMAS);
    // const { data: duracoes , loading: loadDuracoes, error: errorDuracoes } = useFetch(URL_DURACOES);
    // const { data: semestre , loading: loadSemestre, error: errorSemestre } = useFetch(URL_SEMESTRE);
    // const { data: modalidades , loading: loadModalidades, error: errorModalidades } = useFetch(URL_MODALIDADES);

    const [ ucDocentes, setDocentes ] = useState([]);
    const [ ucUO, setUO ] = useState("");
    const [ ucArea, setArea ] = useState("");
    const [ ucHorasTP, setHorasTP ] = useState(0);
    const [ ucHorasT, setHorasT ] = useState(0);
    const [ ucHorasP, setHorasP ] = useState(0);
    const [ ucHorasOT, setHorasOT ] = useState(0);
    const [ ucCursos, setCursos ] = useState([]);
    const [ ucLinguas, setLinguas ] = useState([]);
    const [ detailedView, setDetailedView ] = useState(false);

    useEffect(() => {
        if(dpuc && uos && areas && docentes){
            if(dpuc.linguas)
                setLinguas(dpuc.linguas.split("$").filter((l) => l.length > 0));
            if(dpuc.cursos)
                setCursos(dpuc.cursos.split("$").filter((l) => l.length > 0));

            if(dpuc.docentes){
                var doces = [];
                var docentesNum = dpuc.docentes.split("$").filter((l) => l.length > 0);
                for(var i = 0; i < docentesNum.length; i++)
                    doces.push(docentes.find((docente) => docente.cod_int.toString() === docentesNum[i]));
                setDocentes(doces);
            }

            if(dpuc.uo)
                setUO(uos.find((uo) => uo.id === dpuc.unidadeOrganica));
            
            if(dpuc.areaCientifica)
                setArea(areas.find((area) => area.sigla === dpuc.areaCientifica));

            if(dpuc.horasContacto)
                setHorasOT(dpuc.horasContacto);

            if(dpuc.docenteHoras){
                var parsedString = dpuc.docentesHoras.split("$").filter((l) => l.length > 0);
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
    }, [dpuc, uos, areas, docentes]);

    const changeView = () => {
        setDetailedView(!detailedView);
    }
    return ( 
        <ContentContainer padding="40px" >

            <Row>
                <Col>
                    { (loadDPUC || loadUOS || loadAreas || loadDocentes) && <AnimatedBackground height="30px" width="50%"></AnimatedBackground> }
                    { dpuc && !loadDPUC && !loadUOS && !loadAreas && !loadDocentes && 
                        <Text as="h3" size="xLarge" fontWeight="400"> 
                            {dpuc.designacao}
                        </Text>
                    }
                    <hr/>
                </Col>
            </Row>
            <br/>
            { (loadDPUC || loadUOS || loadAreas || loadDocentes) && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { errorDPUC && <Text as="i" size="large" color="red"> Não foi possível obter informações sobre esta UC. </Text> }
            { dpuc && !loadDPUC && !loadUOS && !loadAreas && !loadDocentes &&
            <ContentContainer> 
                <Row>
                    <Col>
                        <Text as="i" size="medium"> Última alteração: {dpuc.dataAlteracao}</Text>
                    </Col>

                    <Col md="auto">
                        <Button variant="primary" style={{fontSize:"100%"}} onClick={changeView}>
                            { detailedView && "Vista Normal" }
                            { !detailedView && "Vista Detalhada" }
                            
                        </Button>
                    </Col>
                </Row>
                <br/>
                <Row className="flex-column-reverse flex-md-row">
                    <Col sm={8}>
                        { dpuc.objetivos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Objetivos
                                </Text>
                                {dpuc.objetivos.split("\n").map((objetivo) =>(
                                    <Text as="article" size="medium">
                                        { objetivo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.conteudos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Conteúdos
                                </Text>
                                {dpuc.conteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaConteudos && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaConteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.requisitos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Requisitos
                                </Text>
                                {dpuc.requisitos.split("\n").map((requisito) =>(
                                    <Text as="article" size="medium">
                                        <li>{ requisito }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.metodologias &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Metodologias de Ensino
                                </Text>
                                {dpuc.metodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium">
                                        { metodo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaMetodologias && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaMetodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium">
                                        <li>{ metodo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.funcionamento &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Funcionamento da Componente Prática
                                </Text>
                                {dpuc.funcionamento.split("\n").map((func) =>(
                                    <Text as="article" size="medium">
                                        { func }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.aprendizagem &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Aprendizagem Ativa
                                </Text>
                                {dpuc.aprendizagem.split("\n").map((apre) =>(
                                    <Text as="article" size="medium">
                                        { apre }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.avaliacao &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Avaliação
                                </Text>
                                {dpuc.avaliacao.split("\n").map((aval) =>(
                                    <Text as="article" size="medium">
                                        { aval }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.regimeFaltas &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Regime de Faltas
                                </Text>
                                {dpuc.regimeFaltas.split("\n").map((faltas) =>(
                                    <Text as="article" size="medium">
                                        { faltas }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.ficheiros &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Ficheiros
                                </Text>
                                {dpuc.ficheiros.split("\n").map((ficheiro) =>(
                                    <Text as="article" size="medium">
                                        <li><a href={ficheiro} target="_blank">{ ficheiro }</a></li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.bibliografia &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Bibliografia
                                </Text>
                                {dpuc.bibliografia.split("\n").map((livro) =>(
                                    <Text as="article" size="medium">
                                        <li>{ livro }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.observacoes && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                                    Observações
                                </Text>
                                {dpuc.observacoes.split("\n").map((obs) =>(
                                    <Text as="article" size="medium">
                                        <li>{ obs }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                    </Col>
                    <Col sm={4} >
                        <Row>
                        AAAAAAAAAA

                        </Row>
                    </Col>
                </Row>
            </ContentContainer>
            }
        </ContentContainer>
     );
}
 
export default ViewDPUC;