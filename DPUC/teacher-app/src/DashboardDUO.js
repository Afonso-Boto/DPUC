import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import useFetch from './Helper/useFetch';
import CardDPUC from "./CardDPUC";
import { LoadingBackgroundWrapper, Button, Text, Dropdown} from "@paco_ua/pacoui"
import Selector from "./VisualComponents/Selector";
/*a faltar: onClick => para DPUC em edicao, em criacao e fechadas
            search bar com o template ua e passar a ser dinamica
             */

const DashboardDUO  = () => {

    const navigate = useNavigate();

    const filterOptions = [
                    {
                    key: 'Todos',
                    text: 'Mostrar Todos',
                    value: ''
                    },
                    {
                    key: 'Em Criação',
                    text: 'Em Criação',
                    value: 'Criação'
                    },
                    {
                    key: 'Em Edição',
                    text: 'Em Edição',
                    value: 'Edição'
                    },
                    {
                    key: 'Em Aprovação',
                    text: 'Em Aprovação',
                    value: 'Aprovação'
                    },
                    {
                    key: 'Fechados',
                    text: 'Fechados',
                    value: 'Fechados'
                    }
                ]

    const [filterOption, setFilterOption] = useState(filterOptions[0]);
                
    const [dpucList, setDPUCList] = useState([]);

    const URL_DPUC = "http://localhost:8000/dpuc";

    const goToCreate = () => {
        navigate("/create");
    }

    const filterDPUCList = (estado) => {
        setDPUCList(dpuc.filter((d) => (d.estado.includes(estado.value))));
        setFilterOption(estado)
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
            <Row style={{paddingBottom:"10px"}}>
                <Col style={{textAlign:"left"}}>
                    <br></br>
                    <Button primary onClick={goToCreate} style={{fontSize:"100%"}}>
                        Criar nova UC
                    </Button>
                </Col>
                <Col md="4">
                    <Row>
                        <Col>
                            <Text>
                                Filtrar DPUCs por estado:
                            </Text>
                            <Selector
                                className="ultra mega fixe" 
                                options={filterOptions}
                                getOptionLabel={(option)=>option.text}
                                defaultValue={filterOptions[0]}
                                value={filterOption}
                                onChange={(e) => filterDPUCList(e)}
                                isClearable={false}
                            />
                        </Col>
                    </Row>
                
                </Col>
            </Row>
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