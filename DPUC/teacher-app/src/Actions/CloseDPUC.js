import { Button, Text, FormInput } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";


const CloseDPUC = ({id}) => {
    const BASE_URL = "http://localhost:82/creation/fecharDpuc?id=" + id;

    const [show, setShow] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const close = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL)
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
            <Button primary style={{fontSize:"100%"}} onClick={handleShow} >
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
                    <Text as="p">
                        Tem a certeza que pretende <b>fechar</b> este DPUC?
                    </Text>
                    <br/>
                    <Text as="p">
                        O DPUC será revisto e aprovado pelos Serviços de Gestão Académica, não podendo fazer alterações.
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado <b>Fechado(3).</b>
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
                    <Button primary style={{fontSize:"100%"}} onClick={close} >
                        {loading && "A fechar DPUC..." || "Fechar DPUC"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default CloseDPUC;