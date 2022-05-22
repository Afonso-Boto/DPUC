import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import useFetch from './Helper/useFetch';
import CardDPUC from "./CardDPUC";
import { LoadingBackgroundWrapper, Button, Text, Dropdown} from "@paco_ua/pacoui"

/*a faltar: onClick => para DPUC em edicao, em criacao e fechadas
            search bar com o template ua e passar a ser dinamica
             */

const DashboardDUO  = () => {

    const navigate = useNavigate();

    const filterOptions = [
                    {
                    key: 'Todos',
                    text: 'Todos',
                    value: ''
                    },
                    {
                    key: 'Em Criação',
                    text: 'Em Criação',
                    value: 'Em Criação'
                    },
                    {
                    key: 'Em Edição',
                    text: 'Em Edição',
                    value: 'Em Edição'
                    },
                    {
                    key: 'Em Aprovação',
                    text: 'Em Aprovação',
                    value: 'Em Aprovação'
                    },
                    {
                    key: 'Fechados',
                    text: 'Fechados',
                    value: 'Fechados'
                    }
                ]

    const [dpucList, setDPUCList] = useState([]);

    const URL_DPUC = "http://localhost:8000/dpuc";

    const goToCreate = () => {
        navigate("/create");
    }

    const filterDPUCList = (estado) => {
        setDPUCList(dpuc.filter((d) => (d.estado.includes(estado))));
    }

    const { data: dpuc , loading, error } = useFetch(URL_DPUC);

    useEffect(() => {
        setDPUCList(dpuc);
    }, [dpuc]);

    return ( 
        <Container padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="medium"> 
                        Gestão de DPUCs
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text as="h3" color="primary" size="large" fontWeight="400">
                        Olá, docente x! 
                    </Text>
                </Col>
            </Row>
            
            <br/>
            <Row>
                <Col style={{textAlign:"left", paddingTop:"10px"}}>
                    <Button primary onClick={goToCreate} style={{fontSize:"100%"}}>
                        Criar nova UC
                    </Button>
                </Col>
                <Col md="auto">
                    <Row>
                        <Col md="auto" style={{paddingTop:"10px"}}>
                            <Dropdown
                                options={filterOptions}
                                onChange={(e, data) => filterDPUCList(data.value)}
                                placeholder="Filtrar DPUCs"
                            />
                        </Col>
                        {/* 
                        <Col md="auto" style={{paddingTop:"10px"}}>
                            <Button action onClick={() => filterDPUCList("Em Edição")} style={{fontSize:"100%"}}>
                                DPUC em Edição
                            </Button>
                        </Col>
                        <Col md="auto" style={{paddingTop:"10px"}}>
                            <Button action onClick={() => filterDPUCList("Em Criação")} style={{fontSize:"100%"}}>
                                DPUC em Criação
                            </Button>
                            
                        </Col>
                        <Col md="auto" style={{paddingTop:"10px"}}>
                            <Button action onClick={() => filterDPUCList("Em Aprovação")} style={{fontSize:"100%"}}>
                                DPUC aprovação
                            </Button>
                        </Col>
                        <Col md="auto" style={{paddingTop:"10px"}}>
                            <Button action onClick={() => filterDPUCList("Fechados")} style={{fontSize:"100%"}}>
                                DPUCs fechadas
                            </Button>
                        </Col>
                        */}
                    </Row>
                </Col>
            </Row>
            <br/>
            <br/>
            <br/>
            { loading && <LoadingBackgroundWrapper loading length={4} /> }
            { error && <Text as="i" size="large" color="red"> Não foi possível obter os seus Dossier Pedagógicos.</Text> }
            { dpucList &&
                dpucList.map((uc) => (
                    <CardDPUC key={uc.id} dpuc={uc}/>
                ))
            }
        </Container>
     );
}
 
export default DashboardDUO;