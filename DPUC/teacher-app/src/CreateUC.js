import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { Button, Counter, Text, FormInput} from "@paco_ua/pacoui"; 
import Selector from "./VisualComponents/Selector";
import axios from "axios";
import { EntitiesContext } from "./Helper/Context";


const CreateDPUC = () => {

    //const URL_DPUC = "http://localhost:8000/dpuc";
    const URL_DPUC = "http://localhost:82/creation/criarUC?regenteid=";


    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorPOST, setErrorPOST] = useState(false);
    const [loadingPOST, setLoadingPOST] = useState(false);


    const { retryFetch, setRetry, uos, docentes, areas } = useContext(EntitiesContext);

    const [ucName, setName] = useState("");
    const [ucUO, setUO] = useState(null);
    const [ucArea, setArea] = useState(null);
    const [ucECTS, setECTS] = useState(6);
    const [ectsError, setECTSError]= useState("");
    const [ucRegente, setRegente] = useState(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
        setErrorPOST(false);
        
        if(ucName.length < 3 || !ucArea || !ucUO || !ucRegente || ucECTS < 4 || ucECTS > 30){
            setError(true);
            return;
        }
        
        setLoadingPOST(true);

        const date = new Date();
        var dataAlt = "" + date.getFullYear() + "-";
        dataAlt += ((date.getMonth() + 1) > 9 ? "" : "0") + (date.getMonth() + 1);
        dataAlt += "-";
        dataAlt += ((date.getDate()) > 9 ? "" : "0") + (date.getDate());
        
        const uc = { designacao: ucName, unidade_organicaid: ucUO.id, 
            ects: ucECTS, dataAlteracao: dataAlt, acid: ucArea.id }
        
        console.log(uc);

        axios
            .post(URL_DPUC+ucRegente.id, uc)
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setErrorPOST(true);
                console.log(error);
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
                    <Text as="i" size="large" color="red"> Não foi possível carregar o formulário de criação de DPUC. </Text>
                    </Col>
                    <Col md="auto">
                        <Button primary onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { errorPOST &&
                    <Text as="i" size="medium" color="red"> Não foi possível criar a UC. Por favor tente novamente mais tarde. </Text>
            }
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
                <Text as="i" size="medium" color="red"> Preencha todos os campos. </Text>
            }
            {/* Nome da UC e UO */}
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
                    { uos && 
                        <Selector
                            options={uos}
                            value={ucUO}
                            getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                            getOptionValue ={(option)=>option.id}
                            onChange={(e) => setUO(e)}
                            placeholder="Indique a Unidade Orgânica em que a UC está alocada..."
                        />
                    }
                </Col>
            </Row>
            
            {/* Docente Responsável / Regente */}
            <Row style={{paddingTop:"10px"}}>
                <Col lg={12}>
                    <h3>
                        <Text size="large" color="primary" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                    </h3>
                    { docentes &&
                        <Selector
                            options={docentes}
                            value={ucRegente}
                            getOptionLabel ={(option)=>("[" + option.nmec + "] " + option.nome)}
                            getOptionValue ={(option)=>option.id}
                            onChange={(e) => setRegente(e)}
                            placeholder="Selecione o docente responsável pela UC..."
                        />
                    }
                </Col>
            </Row>
            {/* ECTS*/}
            <Row style={{paddingTop:"10px"}}>
                <Col lg={6}>
                    <h2>
                        <Text size="large" color="primary" fontWeight="400">
                            Área Científica
                        </Text>
                    </h2>
                    { uos && 
                        <Selector
                            options={areas}
                            value={ucArea}
                            getOptionLabel ={(option)=>(option.sigla + " - " +option.designacao)}
                            getOptionValue ={(option)=>option.id}
                            onChange={(e) => setArea(e)}
                            placeholder="Indique a Área Científica da UC..."
                        />
                    }
                </Col>
                <Col>
                    <Text size="large" color="primary" fontWeight="400">
                        ECTS
                    </Text>
                    <Counter
                        defaultValue={ucECTS} 
                        name="counter"
                        error={ectsError}
                        onChange={(e) => { changeECTS(e) }}
                    />
                </Col>
            </Row>
        </Container>
     );
}

export default CreateDPUC;