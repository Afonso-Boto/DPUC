import { Button, LoadingBackgroundWrapper, Text, ScrollDownButton } from "@paco_ua/pacoui";
import { Container, Row, Col } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EntitiesContext } from "../Helper/Context";
import useFetch from "../Helper/useFetch";
import useGetDPUC from "../Helper/useGetDPUC";
import ActionList from "../Actions/ActionList";
import DPUCVersions from "../VisualComponents/DPUCVersions";

const ViewDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = "http://localhost:82/creation/dpucs/" + id;


    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/");
    }

    const { retryFetch, setRetry, uos, areas, docentes, estados} = useContext(EntitiesContext);

    const { data , loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    
    const { parsing: loadParse, error: errorParse, dpuc , dpucSet } = useGetDPUC(data);

    const [ detailedView, setDetailedView ] = useState(false);
    const [ estado, setEstado ] = useState(false);
    const [ responsavel, setResponsavel ] = useState(false);



    const changeView = () => {
        setDetailedView(!detailedView);
    }
    const reloadEntities = () => {
        setRetry(retryFetch + 1);
    }

    useEffect(() => {
        if(!estado || !dpucSet || !estados)
            return;
        dpucSet.setEstado(estados.find((e) => e.id === estado));
    }, [estado, dpucSet, estados]);

    useEffect(() => {
        if(!dpucSet|| !responsavel)
            return;
        dpucSet.setResponsavel(responsavel);
    }, [dpucSet, responsavel]);


    return ( 
        <Container>
            <div style={{ position:"fixed", bottom:"50px", right:"10px",  transform: "rotate(180deg)"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, 0)} />
            </div>
            <div style={{ position:"fixed", bottom:"10px", right:"10px"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}/>
            </div>
            
            <Row>
                <Col>
                    { loadDPUC && <LoadingBackgroundWrapper length={2} /> }
                    { dpuc && !loadDPUC && !loadParse &&
                        <h3>
                            <Text size="xLarge" fontWeight="400"> 
                                {dpuc.designacao}
                            </Text>
                        </h3>
                    }
                    <hr/>
                </Col>
            </Row>
            <br/>
            { (!uos || !areas || !docentes) &&
                !loadDPUC && !loadParse && !dpuc &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                    <Text as="i" size="large" color="red"> Não possível obter informações sobre esta UC.</Text>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { loadDPUC && <LoadingBackgroundWrapper height="100px" width="50%"></LoadingBackgroundWrapper> }
            { (errorDPUC || errorParse) && <Text as="i" size="large" color="red"> Não foi possível obter informações sobre este DPUC. </Text> }
            { dpuc && !loadDPUC && !loadParse &&
            <Container> 
                <Row>
                    <Col md={2} style={{paddingTop:"10px"}}>
                        <Button action style={{fontSize:"100%"}} onClick={handleBack}>
                            Voltar
                        </Button>
                    </Col>
                    <Col md={3} style={{paddingTop:"10px"}}>
                        {detailedView && 
                        <Button primary style={{fontSize:"100%"}} onClick={changeView}>
                            Vista Normal
                        </Button>
                        }
                        {!detailedView && 
                        <Button success style={{fontSize:"100%"}} onClick={changeView}>
                            Vista Detalhada
                        </Button>
                        }
                    </Col>
                    <Col  style={{paddingTop:"10px"}}>
                        {dpuc &&
                            <DPUCVersions uc={dpuc.codigo}/>
                        }
                    </Col>
                    <Col md={4} style={{paddingTop:"10px"}}>
                        <ActionList dpuc={dpuc} setEstado={setEstado} setResponsavel={setResponsavel}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Text as="i" size="medium" fontWeight="300"> Última alteração: {dpuc.dataAlteracao && dpuc.dataAlteracao.toLocaleDateString()}</Text>
                    </Col>
                    {   detailedView && dpuc.estado &&
                        <Col sm={"auto"}>
                            <Text as="i" size="medium" color="#63CF7C" fontWeight="500" style={{color:"#63CF7C"}}> Estado: {dpuc.estado.descricao} ({dpuc.estado.id})</Text>
                        </Col>
                    }
                </Row>

                
                <Row className="flex-column-reverse flex-md-row">
                    <Col sm={8}>
                        { dpuc.objetivos &&
                            <Row>
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Objetivos
                                </Text>
                                {dpuc.objetivos.split("\n").map((objetivo) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { objetivo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.conteudos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Conteúdos
                                </Text>
                                {dpuc.conteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaConteudos && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaConteudos.split("\n").map((conteudo) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.requisitos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Requisitos
                                </Text>
                                {dpuc.requisitos.split("\n").map((requisito) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li>{ requisito }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.metodologias &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Metodologias de Ensino
                                </Text>
                                {dpuc.metodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { metodo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaMetodologias && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Coerência de Conteúdos
                                </Text>
                                {dpuc.coerenciaMetodologias.split("\n").map((metodo) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li>{ metodo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.funcionamento &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Funcionamento da Componente Prática
                                </Text>
                                {dpuc.funcionamento.split("\n").map((func) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { func }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.aprendizagem &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Aprendizagem Ativa
                                </Text>
                                {dpuc.aprendizagem.split("\n").map((apre) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { apre }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.avaliacao &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Avaliação
                                </Text>
                                {dpuc.avaliacao.toString().split("\n").map((aval) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { aval }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.regimeFaltas &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Regime de Faltas
                                </Text>
                                {dpuc.regimeFaltas.split("\n").map((faltas) =>(
                                    <Text as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { faltas }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.ficheiros &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Ficheiros
                                </Text>
                                {dpuc.ficheiros.split("\n").map((ficheiro) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li><a href={ficheiro}>{ ficheiro }</a></li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.bibliografia &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Bibliografia
                                </Text>
                                {dpuc.bibliografia.split("\n").map((livro) =>(
                                    <Text as="article" size="medium" fontWeight="300">
                                        <li>{ livro }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.observacoes && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Observações
                                </Text>
                                {dpuc.observacoes.split("\n").map((obs) =>(
                                    <Text as="article" size="medium" fontWeight="300">
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
                                    <Text size="mediumSmall" fontWeight="500">Código</Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{ dpuc.codigo }</p></Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">ECTS </Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{dpuc.ects}</p></Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Grau </Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{dpuc.grau.nome}</p></Text>
                                </Col>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500">Unidade Orgânica </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.unidadeOrganica.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500">Área Científica </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.areaCientifica.designacao}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Docente Responsável </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.responsavel.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Idioma(s) de lecionação </Text>
                                {dpuc.linguas.length > 0 &&
                                 dpuc.linguas.map((l) => (
                                    <Text as="span" size="mediumSmall" fontWeight="350">{l && l.nome}</Text>
                                 ))
                                }
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Modalidade </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.modalidade.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Carga letiva semanal </Text>
                                {dpuc.horasT > 0 && <Text as="span" size="mediumSmall" fontWeight="350">T: {dpuc.horasT}H</Text>}
                                {dpuc.horasTP > 0 && <Text as="span" size="mediumSmall" fontWeight="350">TP: {dpuc.horasTP}H</Text>}
                                {dpuc.horasP > 0 && <Text as="span" size="mediumSmall" fontWeight="350">PL: {dpuc.horasP}H</Text>}
                                {dpuc.horasOT > 0 && <Text as="span"size="mediumSmall" fontWeight="350">OT: {dpuc.horasOT}H</Text>}
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Duração </Text>
                                {dpuc.duracao && <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.duracao.nome}</Text>}
                                <hr className="uc_details_hr"/>
                            </Row>
                            { dpuc.paginaPublica &&
                                <Row>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Página pública da UC </Text>
                                    <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.paginaPublica}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                            }
                            <Row style={{paddingBottom:"10px"}}>
                                <Text as="span" size="mediumSmall" fontWeight="500">Cursos </Text>
                                {dpuc.cursos.length > 0 &&
                                 dpuc.cursos.map((curso) => (
                                    <li><Text size="mediumSmall" fontWeight="350">{curso.nome}</Text></li>
                                 ))   
                                }
                            </Row>
                        </Container>
                        <br/>
                        { detailedView &&
                            <Container className="uc_details_extra">
                                <Row>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Horas de Trabalho </Text>
                                    <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.horasTrabalho}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Período </Text>
                                    <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.periodo.nome}</Text>
                                    <hr className="uc_details_hr"/>
                                </Row>
                                <Row style={{paddingBottom:"10px"}}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Docentes </Text>
                                    {
                                        dpuc.docentes.map((docente) => (
                                            <Text as="span" size="mediumSmall" fontWeight="350">{docente.nome_completo}</Text>
                                        ))   
                                    }
                                </Row>
                            </Container>
                        }
                    </Col>
                </Row>
            </Container>
            }
        </Container>
     );
}
 
export default ViewDPUC;