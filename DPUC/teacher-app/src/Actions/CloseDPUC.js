import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";


const CloseDPUC = ({id}) => {
    const BASE_URL = "http://localhost:82/creation/desativarDpuc?id=" + id;

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const close = () => {
        console.log(BASE_URL)
        axios
            .put(BASE_URL)
            .then(() => {
                handleClose();
            })
            .catch((error) => {
                setError(true);
                console.log(error);
            })
            .finally( () => {
                setLoading(false);
            });
    }

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
                        Tem a certeza que pretende <b>fechar</b> este DPUC?
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button danger style={{fontSize:"100%"}} onClick={close} >
                        Fechar DPUC
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default CloseDPUC;