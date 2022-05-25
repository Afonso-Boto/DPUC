import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { LoadingBackgroundWrapper, Button, Text} from "@paco_ua/pacoui"
import Selector from "../VisualComponents/Selector";
import CardDPUC from "../VisualComponents/CardDPUC";


const DPUCList = ({dpucs, loading, error, canCreate}) => {

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

    const goToCreate = () => {
        navigate("/create");
    }

    const filterDPUCList = (estado) => {
        setDPUCList(dpucs.filter((d) => (d.estado.includes(estado.value))));
        setFilterOption(estado)
    }

    useEffect(() => {
        setDPUCList(dpucs);
    }, [dpucs]);

    return ( 
        <Container>
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