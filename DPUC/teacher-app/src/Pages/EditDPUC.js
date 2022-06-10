import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import useFetch from "../Helper/useFetch";
import axios from "axios";
import useGetDPUC from "../Helper/useGetDPUC";
import getFormattedDPUC from "../Helper/getFormattedDPUC";
import { EntitiesContext } from "../Helper/Context";
import Selector from "../VisualComponents/Selector";
import { Button, LoadingBackgroundWrapper, FormInput, Text, ScrollDownButton, Accordion } from "@paco_ua/pacoui";
import Input from "../VisualComponents/Input";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CloseDPUC from "../Actions/CloseDPUC";
import SelectDocente from "../VisualComponents/SelectDocente";

const EditDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = process.env.REACT_APP_FETCHER + "creation/dpucs/" + id;
    const URL_DPUC_PUT_CREATION = process.env.REACT_APP_FETCHER + "creation/editarDpuc?id=" + id;
    const URL_DPUC_PUT_EDITION = process.env.REACT_APP_FETCHER + "edition/emEdicao?id=" + id + "&finished=" + false;

    const navigate = useNavigate();
    
    const { data, loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    
    const { retryFetch, setRetry, uos, cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes } = useContext(EntitiesContext);

    const { parsing: loadParse, error: errorParse, dpuc, dpucSet} = useGetDPUC(data);
    const [errorPUT, setErrorPUT] = useState(false);
    const [loadingPUT, setLoadingPUT] = useState(false);

    const [estado, setEstado] = useState(0);
    const [showClose, setShowClose] = useState(0);

    const [show, setShow] = useState(false);


    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorPUT(false);
        setLoadingPUT(true);
        
        const URL_DPUC_PUT = dpuc.estadoTipo === "C" ? URL_DPUC_PUT_CREATION : URL_DPUC_PUT_EDITION;
        console.log(getFormattedDPUC(dpuc));
        axios
            .put(URL_DPUC_PUT, getFormattedDPUC(dpuc))
            .then(() => {
                //navigate("/");
            })
            .catch((error) => {
                setErrorPUT(true);
            })
            .finally( () => {
                setLoadingPUT(false);
            });
    }
    const handleBack = () => {
        navigate("/");
    }
    const reloadEntities = () => {
        setRetry(retryFetch + 1);
    }

    return ( 
        <Container>
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Editar Dossier Pedagógico
                    </Text>
                </Col>
            </Row>
            <hr/>
            { (!uos || !cursos || !graus || !areas || !docentes) &&
                !loadDPUC && !loadParse && !dpuc &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Text as="i" size="large" color="red"> Não foi carregar o formulário de edição de DPUC. </Text>
                        <br/>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { errorPUT &&
                <Text as="i" size="medium" color="red"> Não foi possível guardar o DPUC. Por favor tente novamente mais tarde. </Text>
            }
            { (loadDPUC || loadParse) &&
                <LoadingBackgroundWrapper length={2} />
            }
            { (errorDPUC || errorParse) && 
                <Text as="i" size="large" color="red"> Não foi possível obter detalhes sobre este DPUC. </Text>
            }
            { dpuc && !loadDPUC && !loadParse && uos && cursos && graus && areas && docentes &&
            <form onSubmit={handleSubmit}>
                <div style={{ position:"fixed", bottom:"50px", right:"10px",  transform: "rotate(180deg)"}}>
                    <ScrollDownButton onClick={() => window.scrollTo(0, 0)} />
                </div>
                <div style={{ position:"fixed", bottom:"10px", right:"10px"}}>
                    <ScrollDownButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}/>
                </div>
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Button action onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Row>
                            <Col>
                                <Button primary onClick={(e) => {e.preventDefault(); setShowClose(true);}}>
                                    Submeter para Aprovação
                                </Button>
                                <CloseDPUC redirect={true} id={dpuc.id} estadoTipo={dpuc.estadoTipo} setEstado={setEstado} show={showClose} setShow={setShowClose}/>
                            </Col>
                            <Col>
                                <Button primary style={{fontSize:"100%"}}>
                                    { loadingPUT ? "A Guardar DPUC..." : "Guardar"}
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <br/>
                    {/* Nome, Código, ECTS */}
                    <Row>
                        <Col lg={6}>
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Nome da Unidade Curricular
                                </Text>
                            </h3>
                            <h4>
                                <Text as="h4" size="medium" fontWeight="400">
                                    { dpuc.designacao}
                                </Text>
                            </h4>
                        </Col>
                        <Col lg={2}>
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    ECTS
                                </Text>
                            </h3>
                            <h4>
                                <Text as="h4" size="medium" fontWeight="400">
                                    {dpuc.ects}
                                </Text>
                            </h4>
                        </Col>
                        <Col lg={3}>
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Código
                                </Text>
                            </h3>
                            <h4>
                                <Text as="h4" size="medium" fontWeight="400">
                                    {
                                     (dpuc.codigo && dpuc.codigo)
                                     || ("-")
                                    }
                                </Text>
                            </h4>
                        </Col>
                    </Row>
                    {/* UO e Regente*/}
                    <Row style={{paddingTop:"10px"}}>
                        <Col lg={6}>
                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                Unidade Orgânica
                            </Text>
                            { dpuc.unidadeOrganica &&
                                <h4>
                                    <Text as="h4" size="medium" fontWeight="400">
                                        {dpuc.unidadeOrganica.nome}
                                    </Text>
                                </h4>
                            }
                        </Col>
                        <Col lg={"auto"}>
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Docente Responsável (Regente)
                                </Text>
                            </h3>
                            { dpuc.responsavel &&
                                <h4>
                                    <Text as="h4" size="medium" fontWeight="400">
                                        {dpuc.responsavel.nmec} - {dpuc.responsavel.nome}
                                    </Text>
                                </h4>
                            }
                        </Col>
                        
                    </Row>
                    <hr className="custom-hr"/>
                    <Row>
                        <Col>
                        { (dpuc.dataAlteracao &&
                            <>
                                <Text as="span" size="medium" color="#0EB4BD" fontWeight="400">Última alteração: </Text>
                                <Text as="span" size="medium">{dpuc.dataAlteracao.toLocaleDateString()}</Text>
                            </>)
                            ||
                                ("Sem alterações prévias")
                            }
                        </Col>
                        <Col>
                            <Text as="i" size="medium">Campos assinalados com * são obrigatórios</Text>
                        </Col>
                    </Row>
                    {/* Curso(s) de lecionacionação e Grau do Ciclo de Estudos*/}
                    <div className="row row-pad">
                        <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Curso(s) de lecionação*
                                </Text>
                            </h3>
                            { cursos &&
                                <Selector
                                    isMulti
                                    options={cursos}
                                    value={dpuc.cursos}
                                    onChange={(e) => dpucSet.setCursos(Array.from(e, (v => v)))}
                                    getOptionLabel ={(option)=>(option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                    placeholder="Selecione o(s) curso(s) de lecionação da UC..."
                                />
                            }
                        </div>
                        <div className="col-lg-6">
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Grau do Ciclo de estudos*
                                </Text>
                            </h3>
                            { graus && 
                                <Selector
                                    placeholder="Selecione o ciclo de estudos da UC"
                                    options={graus}
                                    value={dpuc.grau}
                                    onChange={(e) => dpucSet.setGrau(e)}
                                    getOptionLabel ={(option)=>(option.nome + " (" + option.ciclo + "º ciclo)" )}
                                    getOptionValue ={(option)=>option.id}
                                />
                            }
                        </div>
                    </div>
                    {/* Área Científica e Idiomas de lecionação */}
                    <div className="row row-pad">
                        <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Área Científica*
                                </Text>
                            </h3>
                            { areas && 
                                <Selector
                                    placeholder="Selecione a área da UC..."
                                    options={areas}
                                    value={dpuc.areaCientifica}
                                    onChange={(e) => dpucSet.setAreaCientifica(e)}
                                    getOptionLabel ={(option)=>(option.sigla + " - " +option.designacao)}
                                />
                            }
                        </div>
                        <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Idioma(s) de lecionação*
                                </Text>
                            </h3>
                            { idiomas && 
                                <Selector 
                                    isMulti 
                                    placeholder="Selecione o(s) idioma(s) de lecionação da UC..." 
                                    options={idiomas}
                                    value={dpuc.linguas}
                                    onChange={(e) => dpucSet.setLinguas(Array.from(e, (v => v)))}
                                    getOptionLabel ={(option)=>(option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                />
                            }
                        </div>
                    </div>
                    {/* Carga Letiva, Duração, Semestre */}
                    <div className="row row-pad">
                    <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Carga Letiva Semanal (em Horas)*
                                </Text>
                            </h3>
                            <Row>
                                <Col lg={"auto"}>
                                    <Row>
                                        <Col lg={"auto"}>
                                            <h3>
                                                <Text as="h3" size="large" fontWeight="400">
                                                    TP
                                                </Text>
                                            </h3>
                                        </Col>
                                        <Col lg={"auto"}>
                                            <Input  
                                            as="input" 
                                            type="number"
                                            min={0} max={12}
                                            value={dpuc.horasTP}
                                            onChange={(e) => dpucSet.setHorasTP(e.target.value)}
                                            style={{width:"55px"}}/>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={"auto"}>
                                    <Row>
                                        <Col lg={"auto"}>
                                            <h3>
                                                <Text as="h3" size="large" fontWeight="400">
                                                    T
                                                </Text>
                                            </h3>
                                        </Col>
                                        <Col lg={"auto"}>
                                            <Input 
                                            as="input" 
                                            type="number"
                                            min={0} max={12}
                                            value={dpuc.horasT}
                                            onChange={(e) => dpucSet.setHorasT(e.target.value)}
                                            style={{width:"55px"}}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={"auto"}>
                                    <Row>
                                        <Col lg={"auto"}>
                                            <h3>
                                                <Text as="h3" size="large" fontWeight="400">
                                                    P
                                                </Text>
                                            </h3>
                                        </Col>
                                        <Col lg={"auto"}>
                                            <Input 
                                            as="input" 
                                            type="number"
                                            min={0} max={12}
                                            value={dpuc.horasP}
                                            onChange={(e) => dpucSet.setHorasP(e.target.value)}
                                            style={{width:"55px"}}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                <Col lg={"auto"}>
                                    <Row>
                                        <Col lg={"auto"}>
                                            <h3>
                                                <Text as="h3" size="large" fontWeight="400">
                                                    OT
                                                </Text>
                                            </h3>
                                        </Col>
                                        <Col lg={"auto"}>
                                            <Input 
                                            as="input" 
                                            type="number"
                                            min={0} max={12}
                                            value={dpuc.horasOT}
                                            onChange={(e) => dpucSet.setHorasOT(e.target.value)}
                                            style={{width:"55px"}}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                    </div>
                    <div className="col-lg-3">
                        <h3>
                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                Duração*
                            </Text>
                        </h3>
                        { duracoes && dpuc.duracao &&
                            <Selector 
                                placeholder="Duração da UC"
                                options={duracoes}
                                value={dpuc.duracao}
                                onChange={(e) => dpucSet.setDuracao(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    { dpuc.duracao && dpuc.duracao.nome === "Semestral" &&
                        <div className="col-lg-3">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Semestre
                                </Text>
                            </h3>
                            { semestre &&
                                <Selector
                                    placeholder="Semestre da UC"
                                    options={semestre}
                                    value={dpuc.periodo}
                                    onChange={(e) => dpucSet.setPeriodo(e)}
                                    getOptionLabel ={(option)=>(option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                />
                            }
                        </div>
                        }
                    </div>
                    {/* Modalidade e Página Pública*/}
                    <div className="row row-pad">
                        <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Modalidade de Lecionação*
                                </Text>
                            </h3>
                            { modalidades &&
                                <Selector 
                                    placeholder="Selecione a modalidade de lecionação da UC"
                                    options={modalidades}
                                    value={dpuc.modalidade}
                                    onChange={(e) => dpucSet.setModalidade(e)}
                                    getOptionLabel ={(option)=>(option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                />
                            }
                        </div>
                        <div className="col-lg-6">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Página Pública da UC
                                </Text>
                            </h3>
                            <FormInput
                                placeholder="Insira o URL da página da UC..."
                                border
                                fontSize="mediumSmall"
                                value={dpuc.paginaPublica}
                                onChange={(e) => dpucSet.setPaginaPublica(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Docentes da UC */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <h3>
                                <Text as="h3" size="large" color="primary" fontWeight="400">
                                    Docentes Associados à UC*
                                </Text>
                            </h3>
                            { dpuc.docentes && 
                                <>
                                    {dpuc.docentes.map((docente) => (
                                        <li>
                                            <Text size="medium">
                                                {docente.nmec}
                                                {" - "}
                                                {docente.nome}
                                                {" - "}
                                                {docente.email}
                                            </Text>
                                        </li>
                                    ))}
                                </>
                            }
                            <br/>   
                            <SelectDocente show={show} setShow={setShow} docente={dpuc.docentes} setDocente={dpucSet.setDocentes} multiple={true}/>
                            <Button primary onClick={(e) => {
                                e.preventDefault();
                                setShow(true)}
                            }>
                                Selecionar Docentes
                            </Button>
                        </div>
                    </div>
                    <hr className="custom-hr"/>
                    {/* Objetivos de aprendizagem */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                        <Accordion
                            structure={[
                                {
                                defaultOpen: true,
                                children: [
                                    <Input 
                                        placeholder="Especifique os objetivos de aprendizagem (conhecimentos, aptidões e competências a desenvolver pelos estudantes)" 
                                        as="textarea" 
                                        value={dpuc.objetivos}
                                        onChange={(e) => {
                                            dpucSet.setObjetivos(e.target.value);
                                            e.target.style.height="1px";
                                            e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 512)+"px";
                                        }}
                                        style={{height:"258px"}}
                                    />
                                ],
                                parent: 
                                    <h3>
                                        <Text as="h3" size="large" color="primary" fontWeight="400">
                                            Objetivos de aprendizagem*
                                            {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                        </Text>
                                    </h3>
                                }
                            ]}
                        />
                        </div>
                    </div>
                    {/* Pré-requisitos */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Especifique os requisitos da UC"  
                                            as="textarea"
                                            value={dpuc.requisitos}
                                            onChange={(e) => {
                                                dpucSet.setRequisitos(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Pré-requisitos da UC*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <hr className="custom-hr"/>
                    {/* Conteúdos programáticos */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Especifique os conteúdos programáticos da UC"  
                                            as="textarea"
                                            value={dpuc.conteudos}
                                            onChange={(e) => {
                                                dpucSet.setConteudos(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 700)+"px";
                                            }}
                                            style={{height:"400px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Conteúdos programáticos*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    {/* Demonstração da coerência dos conteúdos programáticos com os objectivos da unidade curricular. */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Demonstre a coerência dos conteúdos programáticos com os objectivos da unidade curricular" 
                                            as="textarea" 
                                            value={dpuc.coerenciaConteudos}
                                            onChange={(e) => {
                                                dpucSet.setCoerenciaConteudos(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 512)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Coerência dos Conteúdos programáticos*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <hr className="custom-hr"/>
                    {/* Metodologias de ensino */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Especifique as metodologias de ensino da UC" 
                                            as="textarea" 
                                            value={dpuc.metodologias}
                                            onChange={(e) => {
                                                dpucSet.setMetodologias(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 512)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Metodologias de ensino*

                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    {/* Demonstração da coerência das metodologias de ensino com os objectivos de aprendizagem da unidade */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Demonstre a coerência das metodologias de ensino com os objectivos de aprendizagem da unidade" 
                                            as="textarea" 
                                            value={dpuc.coerenciaMetodologias}
                                            onChange={(e) => {
                                                dpucSet.setCoerenciaMetodologias(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 512)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Coerência das Metodologias de ensino*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    { /* Funcionamento da Componente Prática */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Indique o funcionamento da componente prática da UC" 
                                            as="textarea" 
                                            value={dpuc.funcionamento}
                                            onChange={(e) => {
                                                dpucSet.setFuncionamento(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Funcionamento da Componente Prática
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <hr className="custom-hr"/>
                    
                    { /* Aprendizagem ativa */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Apresente as metodologias de ensino que promovam a aprendizagem ativa e a autonomia e fomentem a ligação entre investigação e ensino" 
                                            as="textarea" 
                                            value={dpuc.aprendizagem}
                                            onChange={(e) => {
                                                dpucSet.setAprendizagem(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Aprendizagem ativa
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    { /* Tipo de avaliação */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Indique o(s) tipo(s) de avaliação da UC" 
                                            as="textarea" 
                                            value={dpuc.avaliacao}
                                            onChange={(e) => {
                                                dpucSet.setAvaliacao(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Tipo de avaliação*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    { /* Regime de Faltas */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input 
                                            placeholder="Indique o regime de faltas da UC" 
                                            as="textarea"
                                            value={dpuc.regimeFaltas}
                                            onChange={(e) => {
                                                dpucSet.setRegimeFaltas(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Regime de Faltas
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <hr className="custom-hr"/>
                    { /* Bibliografia de consulta */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input placeholder="Indique a bibliografia principal/obrigatória (com pelo menos uma com data de edição igual ou superior a 2015)" 
                                            as="textarea"
                                            value={dpuc.bibliografia}
                                            onChange={(e) => {
                                                dpucSet.setBibliografia(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 700)+"px";
                                            }}
                                            style={{height:"300px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Bibliografia de consulta*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    { /* Ficheiros
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input placeholder="URL de ficheiros extras úteis à UC" 
                                            as="textarea"
                                            value={dpuc.ficheiros}
                                            onChange={(e) => {
                                                dpucSet.setFicheiros(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=(16 + e.target.scrollHeight)+"px";
                                            }}
                                            style={{height:"48pt"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Ficheiros
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                     */}
                    { /* Observações */}
                    <div className="row row-pad">
                        <div className="col-lg-12">
                            <Accordion
                                structure={[
                                    {
                                    defaultOpen: true,
                                    children: [
                                        <Input placeholder="Indique informação relevante e variada sobre a UC" 
                                            as="textarea" 
                                            value={dpuc.observacoes}
                                            onChange={(e) => {
                                                dpucSet.setObservacoes(e.target.value);
                                                e.target.style.height="1px";
                                                e.target.style.height=Math.min(((16 + e.target.scrollHeight)), 256)+"px";
                                            }}
                                            style={{height:"128px"}}
                                        />
                                    ],
                                    parent: 
                                        <h3>
                                            <Text as="h3" size="large" color="primary" fontWeight="400">
                                                Observações*
                                                {" "}<FontAwesomeIcon icon={{icon: [256, 512, [], 'f107', 'M119.5 326.9L3.5 209.1c-4.7-4.7-4.7-12.3 0-17l7.1-7.1c4.7-4.7 12.3-4.7 17 0L128 287.3l100.4-102.2c4.7-4.7 12.3-4.7 17 0l7.1 7.1c4.7 4.7 4.7 12.3 0 17L136.5 327c-4.7 4.6-12.3 4.6-17-.1z'], iconName: 'angle-down', prefix: 'fal'}} />
                                            </Text>
                                        </h3>
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <br/>
            </form>
            }
        </Container>
     );
}
export default EditDPUC;