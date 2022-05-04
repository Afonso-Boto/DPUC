import { ContentContainer, Input, Select, Text, Button, AnimatedBackground } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EntitiesContext } from "./Helper/Context";
import useFetch from "./useFetch";

const ViewDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = "http://localhost:8000/dpuc/" + id;

    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    const {uos, areas, docentes} = useContext(EntitiesContext);

    const { data: dpuc , loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    
    const [ ucRegente, setRegente ] = useState("");
    const [ ucDocentes, setDocentes ] = useState([]);
    const [ ucUO, setUO ] = useState({});
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
                setLinguas(dpuc.linguas.split("$").filter((l) => l.length > 0).join(", "));
            if(dpuc.cursos)
                setCursos(dpuc.cursos.split("$").filter((l) => l.length > 0));

            if(dpuc.responsavel)
                setRegente(docentes.find((docente) => docente.cod_int === dpuc.responsavel))

            if(dpuc.docentes){
                var doces = [];
                var docentesNum = dpuc.docentes.split("$").filter((l) => l.length > 0);
                for(var i = 0; i < docentesNum.length; i++)
                    doces.push(docentes.find((docente) => docente.cod_int.toString() === docentesNum[i]));
                setDocentes(doces);
            }

            if(dpuc.unidadeOrganica)
                setUO(uos.find((uo) => uo.id === dpuc.unidadeOrganica));
            
            if(dpuc.areaCientifica)
                setArea(areas.find((area) => area.sigla === dpuc.areaCientifica));

            if(dpuc.horasContacto)
                setHorasOT(dpuc.horasContacto);

            if(dpuc.docentesHoras){
                var parsedString = dpuc.docentesHoras.split("$").filter((l) => l.length > 0);
                for(var i = 0; i < parsedString.length; i++){
                    console.log(parsedString[i]);
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
                    { loadDPUC && <AnimatedBackground height="30px" width="50%"></AnimatedBackground> }
                    { dpuc && !loadDPUC && 
                        <Text as="h3" size="xLarge" fontWeight="400"> 
                            {dpuc.designacao}
                        </Text>
                    }
                    <hr/>
                </Col>
            </Row>
            <br/>
            { loadDPUC && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { errorDPUC && <Text as="i" size="large" color="red"> Não foi possível obter informações sobre esta UC. </Text> }
            { dpuc && !loadDPUC &&
            <ContentContainer> 
                <Row>
                    <Col>
                        <Text as="i" size="medium"> Última alteração: {dpuc.dataAlteracao}</Text>
                    </Col>
                    {   detailedView &&
                        <Col sm={"auto"}>
                            <Text as="i" size="medium" color="#F3B21B" fontWeight="500"> Estado: {dpuc.estado}</Text>
                        </Col>
                    }
                    
                </Row>
                <br/>
                <Row>
                    <Col md="auto">
                        <Button variant="default" style={{fontSize:"100%"}} onClick={handleBack}>
                            Voltar
                        </Button>
                    </Col>
                    <Col md="auto">
                        {detailedView && 
                        <Button variant="primary" style={{fontSize:"100%"}} onClick={changeView}>
                            Vista Normal
                        </Button>
                        }
                        {!detailedView && 
                            <Button variant="primary" style={{fontSize:"100%"}} onClick={changeView} 
                                color="#F3B21B" 
                                backgroundColor="#fff" 
                                border="1px solid #F3B21B" 
                                hoverColor="#fff" 
                                hoverBackgroundColor="#F3B21B"
                            >
                                Vista Detalhada
                            </Button>
                        }
                    </Col>
                </Row>
                <br/>
                <Row className="flex-column-reverse flex-md-row">
                    <Col sm={8}>
                        { dpuc.objetivos &&
                            <Row>
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
                                <Text as="h3" size="xlarge" color="#F3B21B" fontWeight="400">
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
                                <Text as="h3" size="xlarge" color="#F3B21B" fontWeight="400">
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
                                <Text as="h3" size="xlarge" color="#F3B21B" fontWeight="400">
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
                    <Col sm={4}>
                        <Container className="uc_details">
                            <Row style={{paddingTop:"10px"}}>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Código </Text>
                                    <Text as="p" size="mediumSmall">{ dpuc.codigo }</Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">ECTS</Text>
                                    <Text as="p" size="mediumSmall">{dpuc.ects}</Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Grau</Text>
                                    <Text as="p" size="mediumSmall">{dpuc.grau}</Text>
                                </Col>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500"> Unidade Orgânica</Text>
                                <Text as="span" size="mediumSmall">{ucUO.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500"> Área Científica</Text>
                                <Text as="span" size="mediumSmall">{ucArea.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Docente Responsável</Text>
                                <Text as="span" size="mediumSmall">{ucRegente.nome_completo}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Idioma(s) de lecionação</Text>
                                <Text as="span" size="mediumSmall">{ucLinguas}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Modalidade</Text>
                                <Text as="span" size="mediumSmall">{dpuc.modalidade}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Carga letiva semanal</Text>
                                {ucHorasT > 0 && <Text as="span" size="mediumSmall">T: {ucHorasT}H</Text>}
                                {ucHorasTP > 0 && <Text as="span" size="mediumSmall">TP: {ucHorasTP}H</Text>}
                                {ucHorasP > 0 && <Text as="span" size="mediumSmall">PL: {ucHorasP}H</Text>}
                                {ucHorasOT > 0 && <Text as="span"size="mediumSmall">OT: {ucHorasOT}H</Text>}
                                <hr className="uc_details_hr"/>
                            </Row>
                            { dpuc.paginaPublica &&
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Página pública da UC</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.paginaPublica}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                            }
                            <Row style={{paddingBottom:"10px"}}>
                                <Text as="span" size="mediumSmall"fontWeight="500"> Cursos</Text>
                                {
                                 ucCursos.map((curso) => (
                                    <Text as="li" size="mediumSmall">{curso}</Text>
                                 ))   
                                }
                            </Row>
                        </Container>
                        <br/>
                        { detailedView &&
                            <Container className="uc_details_extra">
                                <Row style={{paddingTop:"10px"}}>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Carga Horária</Text>
                                    <Text as="span" size="mediumSmall">{ucArea.cargaHoraria}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Horas de Trabalho</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.horasTrabalho}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Período</Text>
                                    <Text as="span" size="mediumSmall">{dpuc.periodo}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row style={{paddingBottom:"10px"}}>
                                    <Text as="span" size="mediumSmall"fontWeight="500"> Docentes</Text>
                                    {
                                        ucDocentes.map((docente) => (
                                            <Text as="span" size="mediumSmall">{docente.nome_completo}</Text>
                                            ))   
                                    }
                                </Row>
                            </Container>
                        }
                    </Col>
                </Row>
            </ContentContainer>
            }
        </ContentContainer>
     );
}
 
export default ViewDPUC;