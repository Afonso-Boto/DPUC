import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { Button, Counter, ThemeProvider as ThemeProviderPaco, Text, FormInput, DropdownSelector, Dropdown, Theme as ThemePaco} from "@paco_ua/pacoui"; //oq vai ser usado
import { Select, Input, Text as TextPortal, ThemeProvider as ThemeProviderPortal, Theme as ThemePortal } from "@uaveiro/ui"; //para remover no final

import useFetch from "./Helper/useFetch";
import axios from "axios";
import { EntitiesContext } from "./Helper/Context";


const CreateDPUC = () => {

    const URL_DPUC = "http://localhost:8000/dpuc";


    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorPOST, setErrorPOST] = useState(false);
    const [loadingPOST, setLoadingPOST] = useState(false);


    const { retryFetch, setRetry, uos, docentes, docentesOptions, uosOptions } = useContext(EntitiesContext);

    const [ucName, setName] = useState("");
    const [ucUO, setUO] = useState(null);
    const [ucECTS, setECTS] = useState(6);
    const [ectsError, setECTSError]= useState("");
    const [ucRegente, setRegente] = useState(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setErrorPOST(false);
        
        if(ucName.length < 3 || !ucUO || !ucRegente || ucECTS < 4 || ucECTS > 30){
            setError(true);
            return;
        }
        
        setLoadingPOST(true);


        const date = new Date();
        var dataAlt = "" + date.getFullYear() + "-";
        dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
        dataAlt += "-";
        dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());
        const uc = { designacao: ucName, unidadeOrganica: ucUO.id, responsavel: ucRegente.cod_int, ects: ucECTS,
                estado: "Em Criação", dataAlteracao: dataAlt}

        axios
            .post(URL_DPUC, uc)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setErrorPOST(true);
            })
            .finally( () => {
                setLoadingPOST(false);
            });

    }
    const handleBack = () => {
        navigate("/");
    }
    const reloadEntities = () => {
        setRetry(retryFetch + 1);
    }

    const changeECTS = (e) => {
        setECTS(e);
        if(e >= 4 && e <= 30){
            setECTSError("");
        }else
            setECTSError("Valor de ECTS necessita de ser entre 4 e 30");
    };

    const changeUO = (value) => {
        setUO(uos.find((uo) => uo.id === value));

    }

    const changeRegente = (value) => {
        setRegente(docentes.find((d) => d.cod_int === value));
    }

    return ( 
        <Container fluid>
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Criar nova UC
                    </Text>
                </Col>
            </Row>
            <hr/>
            { (!uos || !docentes) &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                    <ThemeProviderPortal theme={ThemePortal}>
                        <TextPortal as="i" size="large" color="red"> Não foi possível carregar o formulário de criação de DPUC. </TextPortal>
                    </ThemeProviderPortal>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { errorPOST &&
                    <TextPortal as="i" size="medium" color="red"> Não foi possível criar a UC. Por favor tente novamente mais tarde. </TextPortal>
            }
            <ThemeProviderPortal theme={ThemePortal}>
                <Row>
                    <Col>
                        <Button action onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={(e) => handleSubmit(e)} style={{fontSize:"100%"}}>
                            { loadingPOST ? "A Criar UC..." : "Criar UC"}
                        </Button>
                    </Col>
                </Row>
                <br/>
                { error &&
                    <TextPortal as="i" size="medium" color="red"> Preencha todos os campos. </TextPortal>
                }
                {/* Nome da UC e UO */}
                <Row>
                    <Col lg={6}>
                        <TextPortal as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </TextPortal>
                        <Input placeholder="Nome da UC..." border="1px solid #424242" color="#424242" required 
                            value={ucName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col lg={6}>
                        <TextPortal as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade Orgânica
                        </TextPortal>
                        { uos && 
                            <Select placeholder="Indique a Unidade Orgânica em que a UC está alocada..." variant="black" 
                                options={uos}
                                value={ucUO}
                                onChange={(e) => setUO(e)}
                                getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </Col>
                </Row>
                {/* ECTS*/}
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <TextPortal as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </TextPortal>
                        <Counter
                            defaultValue={ucECTS} 
                            name="counter"
                            error={ectsError}
                            onChange={(e) => {
                                changeECTS(e);
                            }}
                        />
                    </Col>
                </Row>
                {/* Docente Responsável / Regente */}
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={12}>
                        <TextPortal as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </TextPortal>
                        { docentes &&
                            <Select placeholder="Selecione o docente responsável pela UC..." variant="black" 
                            options={docentes}
                            value={ucRegente}
                            onChange={(e) => setRegente(e.cod_int)}
                            getOptionLabel ={(option)=>option.nome_completo}
                            getOptionValue ={(option)=>option.cod_int}
                            required
                            />
                        }
                    </Col>
                </Row>
                </ThemeProviderPortal>

                {/* Nome da UC e UO */}
                {/* 

                <Row>
                    <Col lg={6}>
                        <h3>
                            <Text size="large" color="primary" fontWeight="400">
                                Nome da Unidade Curricular
                            </Text>
                        </h3>
                        <FormInput
                            border
                            fontSize="mediumSmall"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col lg={6}>
                        <h3>
                            <Text size="large" color="primary" fontWeight="400">
                                Unidade Orgânica
                            </Text>
                        </h3>
                        <Dropdown
                            options={uosOptions}
                            fitToContent
                            onChange={(e, data) => changeUO(data.value)}
                        />
                    </Col>
                </Row>
                */}
                {/* Docente Responsável / Regente */}
                
                {/*
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={12}>
                        <h3>
                            <Text size="large" color="primary" fontWeight="400">
                                Docente Responsável (Regente)
                            </Text>
                        </h3>
                        <Dropdown
                            options={docentesOptions}
                            fitToContent
                            onChange={(e, data) => changeRegente(data.value)}
                        />
                    </Col>
                </Row>
                */}

                {/* ECTS*/}
                {/*
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={2}>
                        <Text size="large" color="primary" fontWeight="400">
                            ECTS
                        </Text>
                        <Counter
                            defaultValue={ucECTS} 
                            value={ucECTS}
                            name="counter"
                            error={ectsError}
                            onChange={(e) => {
                                changeECTS(e);
                            }}
                        />
                    </Col>
                </Row>
                */}
                
                
        </Container>
     );
}
 
/* 
Como implementar ???????????????
Carga horária do docentes responsável
Carga horária dos docentes
Horas de contacto (OT)
*/
export default CreateDPUC;