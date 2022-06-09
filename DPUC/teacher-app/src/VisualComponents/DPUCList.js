import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { LoadingBackgroundWrapper, Button, Text, ScrollDownButton, SearchBox } from "@paco_ua/pacoui"
import Selector from "./Selector";
import CardDPUC from "./CardDPUC";
import useFetch from '../Helper/useFetch';
import axios, { Axios } from 'axios';

const DPUCList = ({canCreate, canLaunchEdit=false}) => {

    const navigate = useNavigate();

    const URL_DPUC = "http://localhost:82/creation/dpucs";
    const URL_LAUNCH = "http://localhost:82/edition/iniciarEdicao";
    const URL_SEARCH = "http://localhost:83/edition/iniciarEdicao";


    const { data: dpucs , loading, error } = useFetch(URL_DPUC);

    const [filterOptions, setFilterOptions] = useState(
        [
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
    )

    const [filterOption, setFilterOption] = useState(filterOptions[0]);
                
    const [dpucList, setDPUCList] = useState([]);

    const [searchInput, setSearchInput] = useState("");

    const [launchLoading, setLaunchLoading] = useState(false);
    const [launchError, setLaunchError] = useState(false);

    const goToCreate = () => {
        navigate("/create");
    }

    const launchEdit = () => {
        setLaunchLoading(true);
        setLaunchError(false);
        axios
            .put(URL_LAUNCH)
            .then(() => {
                window.location.reload(false);
            })
            .catch((error) => {
                setLaunchError(error);
            })
            .finally(() => {
                setLaunchLoading(false);
            });
    }

    const filterDPUCList = (estado) => {
        if(estado.value[0] === 0)
            setDPUCList(dpucs);
        else
        setDPUCList(dpucs.filter((d) => (estado.value.includes(d.estadoid))));
        setFilterOption(estado)
    }

    useEffect(() => {
        if(!searchInput || searchInput.length === 0){
            setDPUCList(dpucs);
            return;
        }
        axios
            .get(URL_SEARCH)
            .then((response) =>{
                console.log(response);
            });

    }, [searchInput]);

    useEffect(() => {
        if(!dpucs)
            return;
        const filterCount = new Array(filterOptions.length).fill(0);
        dpucs.map((d) => {
            const filter = filterOptions.find((f) => f.value.includes(d.estadoid));
            filterCount[filterOptions.indexOf(filter)] ++;
        });
        const newFilterOptions = [];
        for(let i = 0; i < filterCount.length; i++){
            const newFilter = filterOptions[i];
            newFilter.text = newFilter.text.split("(")[0] += " (" + filterCount[i] + ")";
            newFilterOptions.push(newFilter);
        }
        setFilterOptions(newFilterOptions);
        setDPUCList(dpucs);
    }, [dpucs]);

    return ( 
        <Container>
            <div style={{ position:"fixed", bottom:"50px", right:"10px",  transform: "rotate(180deg)"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, 0)} />
            </div>
            <div style={{ position:"fixed", bottom:"10px", right:"10px"}}>
                <ScrollDownButton onClick={() => window.scrollTo(0, document.body.scrollHeight)}/>
            </div>

            { loading && <LoadingBackgroundWrapper loading length={4} /> }
            { error && <Text as="i" size="large" color="red"> Não foi possível obter os seus Dossier Pedagógicos.</Text> }
            { !error && !loading &&
                <>
                    <Row>
                        <Col style={{textAlign:"left", paddingBottom:"10px"}}>
                            <br/>
                            { canCreate && 
                                <Button primary onClick={goToCreate} style={{fontSize:"100%"}}>
                                    Criar nova UC
                                </Button>
                            }
                            { canLaunchEdit && 
                                <Button primary onClick={launchEdit} style={{fontSize:"100%"}}>
                                    {
                                        (launchLoading && "A iniciar Processo de Edição...")
                                        ||
                                        "Iniciar Processo de Edição"
                                    }
                                </Button>
                            }
                            {
                                launchError &&
                                <Text as="i" size="large" color="red"> Não foi possível iniciar o processo de Edição de DPUCs.</Text>
                            }
                        </Col>
                    </Row>
                    <Row style={{paddingBottom:"10px"}}>
                        <Col md="8">
                            <Text>
                                Pesquisa de DPUC:
                            </Text>
                            <SearchBox
                                borderColor="#000"
                                value={searchInput}
                                iconColor=""
                                onSearch={(e) => setSearchInput(e)}
                                placeholder="Parâmetros de pesquisa de DPUC"
                            />
                        </Col>
                        <Col  md="4">
                            <Text>
                                Filtrar DPUCs por estado:
                            </Text>
                            {
                                dpucList &&
                                <Selector
                                    options={filterOptions}
                                    getOptionLabel={(option)=>option.text}
                                    defaultValue={filterOptions[0]}
                                    value={filterOption}
                                    onChange={(e) => filterDPUCList(e)}
                                    isClearable={false}
                                />
                            }

                        </Col>
                    </Row>
                </>
            }
            { dpucList &&
                dpucList.map((uc) => (
                    <CardDPUC key={uc.id} dpuc={uc}/>
                ))
            }
        </Container>
     );
}
 
export default DPUCList;