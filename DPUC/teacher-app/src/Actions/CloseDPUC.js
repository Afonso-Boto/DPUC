import { Button, Text } from "@paco_ua/pacoui";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

const CloseDPUC = ({id, estadoTipo, setEstado, show, setShow}) => {
    const BASE_URL_CREATION = "http://localhost:82/creation/fecharDpuc?id=" + id;
    const BASE_URL_EDITION = "http://localhost:82/edition/emEdicao?id=" + id + "&finished=" + true;

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const BASE_URL = estadoTipo === "C" ? BASE_URL_CREATION : BASE_URL_EDITION;
    const proxEstado = estadoTipo === "C" ? 3 : 4;

    console.log(BASE_URL);
    const close = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL, {})
            .then(() => {
                setEstado(proxEstado);
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
                        Submeter para Aprovação
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text as="p">
                        Tem a certeza que pretende submeter este DPUC para <b>Aprovação</b> este DPUC?
                    </Text>
                    <br/>
                    <Text as="p">
                        O DPUC será revisto e aprovado pelos Serviços de Gestão Académica, não podendo fazer alterações.
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado{" "}
                        {
                        (estadoTipo === "C" &&
                            <b>Fechado(3)</b>)
                        ||
                            <b>Em Edição(4)</b>
                        }
                        .
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
                        {(loading && "A submeter DPUC...") || ("Submeter DPUC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
 
export default CloseDPUC;