import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import Input from "../VisualComponents/Input";

const InApprovalDPUC = ({id, codigo, setEstado, show, setShow}) => {
    const BASE_URL = "http://localhost:82/creation/emAprovacao?id=" + id + "&codigo=";

    const [codigoUC, setCodigo] = useState(10000);
    if(codigo)
        setCodigo(codigo);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const approve = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL + codigoUC, {aprovado: true})
            .then(() => {
                setEstado(4);
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
                        Começar Aprovação de DPUC
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Row>
                        <Col sm="auto">
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Insira o código da Unidade Curricular
                                </Text>
                            </h3>
                            
                        </Col>
                        <Col sm="2">
                            <Input
                                border
                                as="input" 
                                type="number"
                                min={0} max={999999}
                                
                                value={codigoUC}
                                onChange={(e) => setCodigo(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Text as="i" size="small">
                        O DPUC passará para o estado <b>Em Aprovação(4).</b>
                    </Text>
                    {   error &&
                        <>
                        <br/>
                        <Text as="i" size="small" color="red">
                            Ocorreu um erro ao alterar o estado do DPUC.
                        </Text>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button success style={{fontSize:"100%"}} onClick={approve} >
                        {loading && "A passar DPUC para aprovação..." || "Passar DPUC para Aprovação DPUC"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default InApprovalDPUC;