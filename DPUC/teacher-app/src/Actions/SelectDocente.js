import { Button, Text, SearchBox } from "@paco_ua/pacoui";
import { Modal, Col, Row, Table, ButtonGroup } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { EntitiesContext } from "../Helper/Context";
import Selector from "../VisualComponents/Selector";

const SelectDocente = ({docente, setDocente, show, setShow, multiple=false}) => {

    const {docentes, uos} = useContext(EntitiesContext);

    const [currentPage, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(10);


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

    useEffect( () => {
        console.log(searchInput);
    },[searchInput, searchUO]);

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
                            {docentes && 
                                docentes.map((docente) => (
                                    <>
                                        <tr>
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
                                            <td>
                                            <Row style={{minHeight:"60px"}}>
                                                <Col className="align-self-center" md="auto" style={{textAlign:"right"}}>
                                                    <Button primary>Adicionar</Button>
                                                </Col>
                                            </Row>
                                            </td>
                                        </tr>
                                    </>
                                ))
                            }
                        </tbody>
                    </Table>
                    <Row>
                        <Col>
                        
                        </Col>
                    </Row>
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