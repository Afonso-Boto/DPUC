import { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, ButtonGroup } from "react-bootstrap";
import { LoadingBackgroundWrapper, Button, Text, ScrollDownButton, SearchBox } from "@paco_ua/pacoui"
import Selector from "./Selector";
import CardDPUC from "./CardDPUC";
import useFetch from '../Helper/useFetch';
import axios, { Axios } from 'axios';
import { EntitiesContext, UserContext } from '../Helper/Context';

const DPUCList = ({canCreate, canLaunchEdit=false}) => {

    const navigate = useNavigate();

    const { docentes, uos } = useContext(EntitiesContext);
    const { userType } = useContext(UserContext);

    const URL_DPUC = process.env.REACT_APP_FETCHER + "creation/dpucs";
    const URL_LAUNCH = process.env.REACT_APP_FETCHER + "edition/iniciarEdicao";
    const URL_SEARCH = process.env.REACT_APP_SEARCH + "search?keywords=";

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

    const [uosOptions, setUOSOptions] = useState([]);

    const [filterOption, setFilterOption] = useState(filterOptions[0]);
    const [filterUO, setFilterUO] = useState({
        id: -1,
        sigla: 'Todas',
        nome: 'Qualquer Unidadade Orgânica'
    });
                
    const [dpucList, setDPUCList] = useState([]);
    const [dpucSearchList, setDPUCSearchList] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [launchLoading, setLaunchLoading] = useState(false);
    const [launchError, setLaunchError] = useState(false);

    const [maxPerPage, setMaxPerPage] = useState(10);
    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);
    const [dpucPage, setDPUCPage] = useState([]);

    const previousPage = () => {
        if(currentPage == 1)
            return;
        setPage(currentPage - 1);
    }
    const nextPage = () => {
        if(currentPage == maxPage)
            return;
        setPage(currentPage + 1);
    }

    // When DPUC List page changes
    useEffect( () => {
        if(currentPage < 1 || currentPage > maxPage)
            return;
        setDPUCPage(dpucList.slice((currentPage - 1) * maxPerPage, currentPage * maxPerPage));
    },[currentPage]);

    // When DPUC List finishes filtering
    useEffect( () => {
        if(!dpucList)
            return;
        setMaxPage(Math.floor(dpucList.length / maxPerPage) + 1);
        setPage(1);
        setDPUCPage(dpucList.slice((currentPage - 1) * maxPerPage, currentPage * maxPerPage));
    },[dpucList]);

    const filterByFilter = (list) =>{
        if(filterOption.value[0] === 0)
            return list;
        return list.filter((d) => (filterOption.value.includes(d.estadoid)))
    }

    const filterByUO = (list) =>{
        if(filterUO.id < 0)
            return list;
        return list.filter((d) => (d.unidade_organicaid === filterUO.id));
    }

    /*
    const filterBySearch = (list) =>{
        if(searchResults.length === 0 && (!searchInput || searchInput === ""))
            return list;
        return list.filter((d) => (searchResults.includes(d.ucCodigo)));
    }
    */
    const filterBySearch = (list) =>{
        if(searchResults.length === 0 && (!searchInput || searchInput === ""))
            return list;
        const docsId = []
        docentes
            .filter((d) => d.nome.toLowerCase().includes(searchResults))
            .map((d) => docsId.push(d.id));
        return list.filter((d) => (
            d.designacao.toLowerCase().includes(searchResults)
            ||
            d.ucCodigo.toString().includes(searchResults)
            ||
            docsId.includes(d.regenteID)
        ));
    }

    useEffect(() => {
        const fbs = filterByUO(filterBySearch(dpucs));
        setDPUCList(filterByFilter(fbs));
        setDPUCSearchList(fbs)
    },[filterOption, filterUO, searchResults])

    useEffect(() => {
        if(!searchInput || searchInput.length === 0){
            setDPUCList(dpucs);
            setSearchResults([]);
            return;
        }
        /*
        const keywords = searchInput.split(" ").join("+");
        axios
            .get(URL_SEARCH+keywords)
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.log(error)
                //setError(error);
            })
            .finally(() => {
                //setLoading(false);
            });
        */
        setSearchResults(searchInput.toLowerCase());
    }, [searchInput]);

    useEffect(() => {
        if(!dpucSearchList)
            return;
        const filterCount = new Array(filterOptions.length).fill(0);
        dpucSearchList.map((d) => {
            const filter = filterOptions.find((f) => f.value.includes(d.estadoid));
            filterCount[filterOptions.indexOf(filter)] ++;
        });
        const newFilterOptions = [];
        for(let i = 0; i < filterCount.length; i++){
            const newFilter = filterOptions[i];
            if(newFilter.value.includes(0))
                newFilter.text = newFilter.text.split("(")[0] += " (" + dpucList.length + ")";
            else
                newFilter.text = newFilter.text.split("(")[0] += " (" + filterCount[i] + ")";
            newFilterOptions.push(newFilter);
        }
        setFilterOptions(newFilterOptions);
    }, [dpucSearchList]);

    useEffect(() =>{
        if(!dpucs)
            return;
        setDPUCList(dpucs);
        setDPUCSearchList(dpucs);
    }, [dpucs]);

    useEffect(() => {
        if(!uos)
            return;
        setUOSOptions([
            {
                id: -1,
                sigla: 'Todas',
                nome: 'Qualquer Unidadade Orgânica'
            },
            ... uos])
    }, [uos]);

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
                        {   userType === "SGA" &&
                            <Col style={{textAlign:"left", paddingBottom:"10px"}}>
                            { uosOptions && 
                                <>
                                <Text>
                                    Filtrar DPUCs por Unidade Orgânica:
                                </Text>
                                <Selector
                                    options={uosOptions}
                                    value={filterUO}
                                    getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                    onChange={(e) => setFilterUO(e)}
                                    placeholder="Indique a Unidade Orgânica em que a UC está alocada..."
                                    isClearable={false}
                                    />
                                </>
                            }
                            </Col>
                        }
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
                                placeholder="Pesquisa por nome, código ou docente regente"
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
                                    onChange={(e) => setFilterOption(e)}
                                    isClearable={false}
                                />
                            }

                        </Col>
                    </Row>
                </>
            }
            { dpucPage &&
                dpucPage.map((uc) => (
                    <CardDPUC key={uc.id} dpuc={uc}/>
                ))
            }
            { (!dpucPage || dpucPage.length === 0) &&
                <>
                    <br/>
                    <Text as="i" size="large">Não foram encontrados DPUCs</Text>
                </>
            }
            <Row>
                <Col></Col>
                <Col>
                    <ButtonGroup>
                        { 
                            (currentPage > 1 && 
                                <Button primary onClick={previousPage}>{"<"}</Button>)
                            ||
                            <Button primary disabled>{"<"}</Button>
                        }
                        <Text size="large" color="primary" 
                                className="align-self-center"
                                style={{paddingLeft:"15px", paddingRight:"15px"}}
                        >
                            {currentPage}
                        </Text>
                        { 
                            (currentPage < maxPage && 
                                <Button primary onClick={nextPage}>{">"}</Button>)
                            ||
                            <Button primary disabled>{">"}</Button>
                        }
                    </ButtonGroup>
                </Col>
                <Col></Col>
            </Row>
        </Container>
     );
}
 
export default DPUCList;