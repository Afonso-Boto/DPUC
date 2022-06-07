import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { LoadingBackgroundWrapper, Button, Text, ScrollDownButton } from "@paco_ua/pacoui"
import Selector from "../VisualComponents/Selector";
import CardDPUC from "../VisualComponents/CardDPUC";
import useFetch from '../Helper/useFetch';

const DPUCList = ({canCreate}) => {

    const navigate = useNavigate();

    const URL_DPUC = "http://localhost:82/creation/dpucs";

    const { data: dpucs , loading, error } = useFetch(URL_DPUC);

    const filterOptions = [
        {
            key: 'Todos',
            text: 'Mostrar Todos',
            value: [0]
        },
        {
            key: 'Em Criação',
            text: '1 - Em Criação',
            value: [1, 7]
        },
        {
            key: 'Em Edição',
            text: '2 - Em Edição',
            value: [2, 8]
        },
        {
            key: 'Fechados',
            text: '3 - Fechados',
            value: [3]
        },
        {
            key: 'Em Aprovação',
            text: '4 - Em Aprovação',
            value: [4, 9]
        },
        {
            key: 'Aprovados',
            text: '5 - Aprovados',
            value: [5, 10]
        },
        {
            key: 'Desativados',
            text: '6 - Desativados',
            value: [6]
        },
    ]

    const [filterOption, setFilterOption] = useState(filterOptions[0]);
                
    const [dpucList, setDPUCList] = useState([]);

    const goToCreate = () => {
        navigate("/create");
    }

    const filterDPUCList = (estado) => {
        if(estado.value[0] === 0)
            setDPUCList(dpucs);
        else
        setDPUCList(dpucs.filter((d) => (estado.value.includes(d.estadoid))));
        setFilterOption(estado)
    }

    useEffect(() => {
        setDPUCList(dpucs);
        console.log(dpucs);
    }, [dpucs]);

    return ( 
        <Container>
            <div style={{ position:"fixed", bottom:"50px", right:"10px",  transform: "rotate(180deg)"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, 0)} />
            </div>
            <div style={{ position:"fixed", bottom:"10px", right:"10px"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}/>
            </div>
            <Row style={{paddingBottom:"10px"}}>
                <Col style={{textAlign:"left"}}>
                    <br/>
                    { canCreate && 
                        <Button primary onClick={goToCreate} style={{fontSize:"100%", height:"64%"}}>
                            Criar nova UC
                        </Button>
                    }
                </Col>
                <Col md="4">
                    <Row>
                        <Col>
                            <Text>
                                Filtrar DPUCs por estado:
                            </Text>
                            <Selector
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
 
export default DPUCList;