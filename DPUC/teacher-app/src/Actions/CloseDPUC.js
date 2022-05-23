import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";

const CloseDPUC = (id) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return ( 
        <>
            <Button danger style={{fontSize:"100%"}} onClick={handleShow} >
                Fechar DPUC
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
                        Fechar DPUC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        Tem a certeza que pretende fechar este DPUC?
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button danger style={{fontSize:"100%"}} onClick={handleClose} >
                        Fechar DPUC
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default CloseDPUC;