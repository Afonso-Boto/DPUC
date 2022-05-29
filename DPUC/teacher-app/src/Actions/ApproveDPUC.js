import { Button, Text } from "@paco_ua/pacoui";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const ApproveDPUC = ({ id, setEstado, show, setShow }) => {
    const BASE_URL = "http://localhost:82/creation/aprovarDpuc?id=" + id;

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const approve = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL, {aprovado: true})
            .then(() => {
                setEstado(5);
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
                        Aprovar DPUC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        Tem a certeza que pretende <b>aprovar</b> este DPUC?
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado <b>Aprovado(5)</b>.
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
                        {(loading && "A aprovar DPUC...") || ("Aprovar DPUC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ApproveDPUC;