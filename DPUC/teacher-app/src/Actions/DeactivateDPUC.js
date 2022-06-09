import { Button, Text } from "@paco_ua/pacoui";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";


const DeactivateDPUC = ({id, setEstado, show, setShow}) => {
    const BASE_URL = process.env.REACT_APP_FETCHER + "creation/desativarDpuc?id=" + id;

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const close = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL)
            .then(() => {
                setEstado(6);
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
                        Fechar DPUC
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text>
                        Tem a certeza que pretende <b>desativar</b> este DPUC?
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado <b>Desativado(6)</b>.
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
                    <Button danger style={{fontSize:"100%"}} onClick={close} >
                        {(loading && "A desativar DPUC...") || ("Desativar DPUC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default DeactivateDPUC;