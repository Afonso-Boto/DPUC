import classes from '../index.css';
import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";

const ApproveDPUC = ({id, codigo}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(codigo)
    return ( 
        <>
            <Button primary style={{fontSize:"100%"}} onClick={handleShow} >
                Aprovar DPUC
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
                        Aprovar DPUC
                    </Modal.Title>
                </Modal.Header>
                { codigo && 
                    <Modal.Body>
                        <Text>
                            Tem a certeza que pretende aprovar este DPUC?
                        </Text>
                    </Modal.Body>
                    ||
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
                                    onChange={(e) => console.log(e)}
                                />
                            </Col>
                        </Row>
                    </Modal.Body>
                }
                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button primary style={{fontSize:"100%"}} onClick={handleClose} >
                        Aprovar DPUC
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ApproveDPUC;