import { Button, Text } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { EntitiesContext } from "../Helper/Context";
import SelectDocente from "../VisualComponents/SelectDocente";

const ChangeDR = ({id, responsavel, setResponsavel, show, setShow}) => {
    const BASE_URL = process.env.REACT_APP_FETCHER + "edition/setRegente?id=" + id + "&regenteid=";

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regente, setRegente] = useState(responsavel);
    const [showSelect, setShowSelect] = useState(false);


    const handleClose = () => {
        setRegente(responsavel);
        setShow(false);
    }

    const approve = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL + regente.id)
            .then(() => {
                setResponsavel(regente);
                handleClose();
            })
            .catch((error) => {
                setError(true);
            })
            .finally( () => {
                setLoading(false);
            });
        
    }
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
                        Alterar Responsável da Unidade Curricular
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                <Row>
                        <Col sm="auto">
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Responsável da UC:
                                </Text>
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        {
                            regente &&
                            <Col className="align-self-center">
                                <Text size="medium">
                                    {regente.nmec}
                                    {" - "}
                                    {regente.nome}
                                    {" - "}
                                    {regente.email}
                                </Text>
                            </Col>
                        }
                        <Col md="auto">
                            <SelectDocente show={showSelect} setShow={setShowSelect} docente={regente} setDocente={setRegente} canRemove={false}/>
                            <Button primary onClick={() => setShowSelect(true)}>
                                Alterar Docente Responsável
                            </Button>
                        </Col>
                    </Row>
                    {   error &&
                        <>
                        <br/>
                        <Text as="i" size="small" color="red">
                            Ocorreu um erro ao alterar o regente da Unidade Curricular.
                        </Text>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button primary style={{fontSize:"100%"}} onClick={approve} >
                        {(loading && "A alterar Responsável da UC...") || ("Alterar Responsável da UC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ChangeDR;