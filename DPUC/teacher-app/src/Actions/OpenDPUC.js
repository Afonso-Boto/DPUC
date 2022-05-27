import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const OpenDPUC = ({id, setEstado}) => {
    const BASE_URL = "http://localhost:82/creation/aprovarDpuc?id=" + id;

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const approve = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL, {aprovado:false, estadoid: 2})
            .then(() => {
                setEstado(2);
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
                Re-abrir DPUC
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
                        Abrir DPUC
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Text as="p">
                        Tem a certeza que pretende <b>abrir</b> este DPUC?
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado <b>Em Edição(2).</b>
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
                        {loading && "A abrir DPUC..." || "Abrir DPUC"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default OpenDPUC;