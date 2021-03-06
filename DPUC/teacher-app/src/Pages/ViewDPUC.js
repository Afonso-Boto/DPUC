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

    const URL_DPUC = process.env.REACT_APP_FETCHER + "creation/dpucs/" + id;


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
                    <Text as="i" size="large" color="red"> N??o poss??vel obter informa????es sobre esta UC.</Text>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { loadDPUC && <LoadingBackgroundWrapper height="100px" width="50%"></LoadingBackgroundWrapper> }
            { (errorDPUC || errorParse) && <Text as="i" size="large" color="red"> N??o foi poss??vel obter informa????es sobre este DPUC. </Text> }
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
                            <DPUCVersions uc={dpuc.codigo} id={dpuc.id}/>
                        }
                    </Col>
                    <Col md={4} style={{paddingTop:"10px"}}>
                        <ActionList dpuc={dpuc} setEstado={setEstado} setResponsavel={setResponsavel}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Text as="i" size="medium" fontWeight="300"> ??ltima altera????o: {dpuc.dataAlteracao && dpuc.dataAlteracao.toLocaleDateString()}</Text>
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
                                {dpuc.objetivos.split("\n").map((objetivo, index) =>(
                                    <Text key={"obj_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { objetivo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.conteudos &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Conte??dos
                                </Text>
                                {dpuc.conteudos.split("\n").map((conteudo, index) =>(
                                    <Text key={"con_"+index} as="article" size="medium" fontWeight="300">
                                        <li>{ conteudo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaConteudos && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Coer??ncia de Conte??dos
                                </Text>
                                {dpuc.coerenciaConteudos.split("\n").map((conteudo, index) =>(
                                    <Text key={"ccon_"+index}  as="article" size="medium" fontWeight="300">
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
                                {dpuc.requisitos.split("\n").map((requisito, index) =>(
                                    <Text key={"req_"+index}  as="article" size="medium" fontWeight="300">
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
                                {dpuc.metodologias.split("\n").map((metodo, index) =>(
                                    <Text key={"met_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { metodo }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.coerenciaMetodologias && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Coer??ncia de Metodologias
                                </Text>
                                {dpuc.coerenciaMetodologias.split("\n").map((metodo, index) =>(
                                    <Text key={"cmet_"+index} as="article" size="medium" fontWeight="300">
                                        <li>{ metodo }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.funcionamento &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Funcionamento da Componente Pr??tica
                                </Text>
                                {dpuc.funcionamento.split("\n").map((func, index) =>(
                                    <Text  key={"fun_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
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
                                {dpuc.aprendizagem.split("\n").map((apre, index) =>(
                                    <Text key={"apr_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
                                        { apre }
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.avaliacao &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Avalia????o
                                </Text>
                                {dpuc.avaliacao.toString().split("\n").map((aval, index) =>(
                                    <Text key={"ava_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
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
                                {dpuc.regimeFaltas.split("\n").map((faltas, index) =>(
                                    <Text key={"reg_"+index} as="article" size="medium" fontWeight="300" style={{paddingBottom:"2pt"}}>
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
                                {dpuc.ficheiros.split("\n").map((ficheiro, index) =>(
                                    <Text key={"fic_"+index} as="article" size="medium" fontWeight="300">
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
                                {dpuc.bibliografia.split("\n").map((livro, index) =>(
                                    <Text key={"liv_"+index} as="article" size="medium" fontWeight="300">
                                        <li>{ livro }</li>
                                    </Text>
                                ))}
                            </Row>
                        }
                        { dpuc.observacoes && detailedView &&
                            <Row className="viewUC-row">
                                <Text as="h3" size="xlarge" color="primary" fontWeight="400">
                                    Observa????es
                                </Text>
                                {dpuc.observacoes.split("\n").map((obs, index) =>(
                                    <Text key={"obs_"+index} as="article" size="medium" fontWeight="300">
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
                                    <Text size="mediumSmall" fontWeight="500">C??digo</Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{ dpuc.codigo }</p></Text>
                                </Col>
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">ECTS </Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{dpuc.ects}</p></Text>
                                </Col>
                                {/* 
                                <Col sm={"auto"}>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Grau </Text>
                                    <Text size="mediumSmall" fontWeight="350"><p>{dpuc.grau.nome}</p></Text>
                                </Col>
                                */}
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500">Unidade Org??nica </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.unidadeOrganica.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall" fontWeight="500">??rea Cient??fica </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.areaCientifica.designacao}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Docente Respons??vel </Text>
                                <Text as="span" size="mediumSmall" fontWeight="350">{dpuc?.responsavel?.nome}</Text>
                                <hr className="uc_details_hr"/>
                            </Row>
                            <Row>
                                <Text as="span" size="mediumSmall"fontWeight="500">Idioma(s) de leciona????o </Text>
                                {dpuc.linguas.length > 0 &&
                                 dpuc.linguas.map((l, index) => (
                                    <Text key={"lin_"+index} as="span" size="mediumSmall" fontWeight="350">{l && l.nome}</Text>
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
                                <Text as="span" size="mediumSmall"fontWeight="500">Dura????o </Text>
                                {dpuc.duracao && <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.duracao.nome}</Text>}
                                
                            </Row>
                            { dpuc.paginaPublica &&
                                <Row>
                                    <hr className="uc_details_hr"/>
                                    <Text as="span" size="mediumSmall" fontWeight="500">P??gina p??blica da UC </Text>
                                    <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.paginaPublica}</Text>
                                </Row>
                            }
                            {/*
                            <Row style={{paddingBottom:"10px"}}>
                                <hr className="uc_details_hr"/>
                                <Text as="span" size="mediumSmall" fontWeight="500">Cursos </Text>
                                {dpuc.cursos.length > 0 &&
                                 dpuc.cursos.map((curso, index) => (
                                    <li key={"cur_"+index}><Text size="mediumSmall" fontWeight="350">{curso.nome}</Text></li>
                                 ))   
                                }
                            </Row>
                            */}
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
                                    <Text as="span" size="mediumSmall" fontWeight="500">Per??odo </Text>
                                    <Text as="span" size="mediumSmall" fontWeight="350">{dpuc.periodo.nome}</Text>
                                </Row>
                                {/* 
                                <Row style={{paddingBottom:"10px"}}>
                                    <hr className="uc_details_hr"/>
                                    <Text as="span" size="mediumSmall" fontWeight="500">Docentes </Text>
                                    {
                                        dpuc.docentes.map((docente, index) => (
                                            <Text key={"doc_"+index} as="span" size="mediumSmall" fontWeight="350">{docente.nome_completo}</Text>
                                        ))   
                                    }
                                </Row>
                                */}
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