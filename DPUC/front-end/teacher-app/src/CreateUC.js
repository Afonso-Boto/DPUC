import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { Button, FormInput, DropdownSelector, Dropdown } from "@paco_ua/pacoui";
import { Select, Input, Text } from "@uaveiro/ui";

import useFetch from "./Helper/useFetch";
import axios from "axios";
import { EntitiesContext } from "./Helper/Context";


import {
    ThemeProvider as ThemeProviderPortal,
    Theme as ThemePortal
  } from "@uaveiro/ui";


const CreateDPUC = () => {

    const URL_DPUC = "http://localhost:8000/dpuc";


    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorPOST, setErrorPOST] = useState(false);
    const [loadingPOST, setLoadingPOST] = useState(false);


    const { retryFetch, setRetry, uos, docentes } = useContext(EntitiesContext);

    const [ucName, setName] = useState("");
    const [ucUO, setUO] = useState(null);
    const [ucECTS, setECTS] = useState(6);
    const [ucRegente, setRegente] = useState(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setErrorPOST(false);
        
        if(!ucUO || !ucRegente ){
            setError(true);
            return;
        }
        
        setLoadingPOST(true);


        const date = new Date();
        var dataAlt = "" + date.getFullYear() + "-";
        dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
        dataAlt += "-";
        dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());
        const uc = { designacao: ucName, unidadeOrganica: ucUO, responsavel: ucRegente, ects: ucECTS,
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

    return ( 
        <Container>
            <Row>
                <Col>
                    <ThemeProviderPortal theme={ThemePortal}>
                        <Text as="h3" size="xLarge" fontWeight="400"> 
                            Criar UC
                        </Text>
                    </ThemeProviderPortal>
                    <hr/>
                </Col>
            </Row>
            <br/>
            { (!uos || !docentes) &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                    <ThemeProviderPortal theme={ThemePortal}>
                        <Text as="i" size="large" color="red"> Não foi possível carregar o formulário de criação de DPUC. </Text>
                    </ThemeProviderPortal>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { errorPOST &&
                    <Text as="i" size="medium" color="red"> Não foi possível criar a UC. Por favor tente novamente mais tarde. </Text>
            }
            <form onSubmit={handleSubmit}>
            <ThemeProviderPortal theme={ThemePortal}>
                <Row>
                    <Col>
                        <Button action onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button primary style={{fontSize:"100%"}}>
                            { loadingPOST ? "A Criar UC..." : "Criar UC"}
                        </Button>
                    </Col>
                </Row>
                <br/>
                { error &&
                    <Text as="i" size="medium" color="red"> Preencha todos os campos. </Text>
                }
                
                {/* Nome da UC e UO */}
                <Row>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Input placeholder="Nome da UC..." border="1px solid #424242" color="#424242" required 
                            value={ucName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Col>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade Orgânica
                        </Text>
                        { uos && 
                            <Select placeholder="Indique a Unidade Orgânica em que a UC está alocada..." variant="black" 
                                options={uos}
                                onChange={(e) => setUO(e.id)}
                                getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                                getOptionValue ={(option)=>option.id}
                                />
                        }
                    </Col>
                </Row>
                {/* ECTS*/}
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Input border="1px solid #424242" color="#424242" required type="number"
                            min={4} max={30}
                            value={ucECTS}
                            onChange={(e) => setECTS(e.target.value)}
                            style={{width:"50px"}}
                        />
                    </Col>
                </Row>

                {/* Docente Responsável / Regente */}
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={12}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                        { docentes &&
                            <Select placeholder="Selecione o docente responsável pela UC..." variant="black" 
                            options={docentes}
                            onChange={(e) => setRegente(e.cod_int)}
                            getOptionLabel ={(option)=>option.nome_completo}
                            getOptionValue ={(option)=>option.cod_int}
                            required
                            />
                        }
                        
                    </Col>
                </Row>
                </ThemeProviderPortal>
            </form>
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