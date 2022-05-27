import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const InApprovalDPUC = ({id, codigo}) => {
    const BASE_URL = "http://localhost:82/creation/emAprovacao?id=" + id + "&codigo=";

    const [show, setShow] = useState(false);
    const [codigoUC, setCodigo] = useState(codigo);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const approve = () => {
        axios
            .put(BASE_URL + codigoUC, {aprovado: true})
            .then(() => {
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
            <Button primary style={{fontSize:"90%"}} onClick={handleShow} >
                Começar Aprovação
            </Button>
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
                        Começar Aprovação de DPUC
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Row>
                        <Col>
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Insira o código da Unidade Curricular
                                </Text>
                            </h3>
                            <FormInput
                                border
                                fontSize="mediumSmall"
                                value={codigoUC}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Modal.Body>

                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button success style={{fontSize:"100%"}} onClick={approve} >
                        Passar DPUC para Aprovação
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default InApprovalDPUC;