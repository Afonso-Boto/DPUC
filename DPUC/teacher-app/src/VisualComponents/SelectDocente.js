import { Button, Text, SearchBox } from "@paco_ua/pacoui";
import { Modal, Col, Row, Table, ButtonGroup } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { EntitiesContext } from "../Helper/Context";
import Selector from "./Selector";

const SelectDocente = ({docente, setDocente, show, setShow, multiple=false, canRemove=true}) => {

    const MAX_DOCENTES_PER_PAGE = 5;

    const {docentes, uos} = useContext(EntitiesContext);

    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);

    const [docentesPage, setDocentesPage] = useState([]);
    const [filteredDocentes, setFilteredDocentes] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [searchUO, setSearchUO] = useState([]);

    const handleClose = () => {
        setShow(false);
    }

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

    // For multiple docente
    const addDocente = (doce) => {
        if(docente.includes(doce))
            return;
        setDocente([... docente, doce]);
    }
    const remDocentes = (doce) => {
        setDocente(docente.filter((d) => d.id !== doce.id));
    }

    // For single Docente
    const selectDocente = (doce) => {
        setDocente(doce);
    }
    const remDocente = (doce) => {
        setDocente(null);
    }

    // When Docente List page changes
    useEffect( () => {
        if(currentPage < 1 || currentPage > maxPage)
            return;
        setDocentesPage(filteredDocentes.slice((currentPage - 1) * MAX_DOCENTES_PER_PAGE, currentPage * MAX_DOCENTES_PER_PAGE));
    },[currentPage]);

    // When Docente List finishes filtering
    useEffect( () => {
        setMaxPage(Math.floor(filteredDocentes.length / MAX_DOCENTES_PER_PAGE) + 1);
        setPage(1);
        setDocentesPage(filteredDocentes.slice((currentPage - 1) * MAX_DOCENTES_PER_PAGE, currentPage * MAX_DOCENTES_PER_PAGE));
    },[filteredDocentes]);

    // When a filter changes
    useEffect( () => {
        setFilteredDocentes(
            docentes
            .filter(o => 
                (o.nome.toLowerCase().includes(searchInput.toLowerCase()))
                || 
                (o.email.toLowerCase().includes(searchInput.toLowerCase()))
                ||
                (o.nmec.toString().includes(searchInput))
            )
        )
    },[searchInput, searchUO]);

    // On Docentes load
    useEffect( () => {
        if(!docentes)
            return
        setFilteredDocentes(docentes);
    },[docentes]);

    return ( 
        <>
            <Modal
                show={show} 
                onHide={handleClose} 
                animation={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                dialogClassName="modal-ua"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {
                            (multiple && "Selecionar Docentes")
                            ||
                            "Selecionar Docente"
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <SearchBox
                                borderColor="#000"
                                value={searchInput}
                                iconColor=""
                                onSearch={(e) => setSearchInput(e)}
                                placeholder="Insira o Nome, Email ou Número Mecanográfico do docente"
                            />
                        </Col>
                    </Row>
                    <br/>
                    {/* 
                    <Row>
                        <Col>
                        { uos && 
                            <Selector
                            options={uos}
                            value={searchUO}
                            getOptionLabel ={(option)=>(option.sigla + " - " +option.nome)}
                            getOptionValue ={(option)=>option.id}
                            onChange={(e) => setSearchUO(e)}
                            placeholder="Indique a Unidade Orgânica do Docente..."
                            />
                        }
                        </Col>
                    </Row>
                    */}
                    
                    <Table striped hover size="sm">
                        <thead style={{borderBottom:"2px solid #0EB4BD"}}>
                            <tr>
                            <th>
                                <Row style={{color:"#0EB4BD"}}>
                                    <Col md="2" style={{textAlign:"center"}}>
                                        NMec
                                    </Col>
                                    <Col md="6">
                                        Nome
                                    </Col>
                                    <Col md="3">
                                        Email
                                    </Col>
                                    <Col md="3">
                                    </Col>
                                </Row>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {docentesPage && 
                                docentesPage.map((d) => (
                                        <tr key={d.id + "docente"}>
                                            <td>
                                            <Row style={{minHeight:"60px"}}>
                                                <Col className="align-self-center" md="2" style={{textAlign:"center"}}>
                                                    {d.nmec}
                                                </Col>
                                                <Col className="align-self-center" md="6">
                                                    {d.nome}
                                                </Col>
                                                <Col className="align-self-center" md="3">
                                                    {d.email}
                                                </Col>
                                                
                                            </Row>
                                            </td>
                                            <td>
                                            <Row style={{minHeight:"60px"}}>
                                                <Col className="align-self-center" md="auto" style={{textAlign:"right"}}>
                                                    {
                                                        (multiple && 
                                                            (
                                                                !docente.includes(d) && <Button primary onClick={() => addDocente(d)}>Adicionar</Button>
                                                                ||
                                                                <Button primary disabled>Adicionar</Button>
                                                            )
                                                        )
                                                        ||
                                                        <Button primary onClick={() => selectDocente(d)}>Selecionar</Button>
                                                    }
                                                </Col>
                                            </Row>
                                            </td>
                                        </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                    {
                        (!docentesPage || docentesPage.length == 0)
                        &&
                        <Text as="i">Não foram encontrados docentes.</Text>
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
                    <Row>
                        <Col>
                            {
                                (multiple && <Text size="large">Docentes Selecionados</Text>)
                                ||
                                <Text size="large">Docente Selecionado</Text>
                            }
                        </Col>
                    </Row>
                    <Table striped hover size="sm">
                        <thead style={{borderBottom:"2px solid #0EB4BD"}}>
                            <tr>
                            <th>
                                <Row style={{color:"#0EB4BD"}}>
                                    <Col md="2" style={{textAlign:"center"}}>
                                        NMec
                                    </Col>
                                    <Col md="6">
                                        Nome
                                    </Col>
                                    <Col md="3">
                                        Email
                                    </Col>
                                    <Col md="3">
                                    </Col>
                                </Row>
                            </th>
                            </tr>
                        </thead>
                        <tbody>
                            {docente && 
                                (multiple && docente.map((d) => (
                                    <tr key={d.id}>
                                        <td>
                                        <Row style={{minHeight:"60px"}}>
                                            <Col className="align-self-center" md="2" style={{textAlign:"center"}}>
                                                {d.nmec}
                                            </Col>
                                            <Col className="align-self-center" md="6">
                                                {d.nome}
                                            </Col>
                                            <Col className="align-self-center" md="3">
                                                {d.email}
                                            </Col>
                                            
                                        </Row>
                                        </td>
                                        <td>
                                        <Row style={{minHeight:"60px"}}>
                                            <Col className="align-self-center" md="auto" style={{textAlign:"right"}}>
                                                <Button primary onClick={() => remDocentes(d)}>Remover</Button>
                                            </Col>
                                        </Row>
                                        </td>
                                    </tr>
                                ))
                                ||
                                    <tr key={docente.id}>
                                        <td>
                                        <Row style={{minHeight:"60px"}}>
                                            <Col className="align-self-center" md="2" style={{textAlign:"center"}}>
                                                {docente.nmec}
                                            </Col>
                                            <Col className="align-self-center" md="6">
                                                {docente.nome}
                                            </Col>
                                            <Col className="align-self-center" md="3">
                                                {docente.email}
                                            </Col>
                                        </Row>
                                        </td>
                                        {
                                            canRemove &&
                                            <td>
                                            <Row style={{minHeight:"60px"}}>
                                                <Col className="align-self-center" md="auto" style={{textAlign:"right"}}>
                                                    <Button primary onClick={() => remDocente()}>Remover</Button>
                                                </Col>
                                            </Row>
                                            </td>
                                        }
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button primary style={{fontSize:"100%"}} onClick={handleClose}>
                        Guardar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default SelectDocente;