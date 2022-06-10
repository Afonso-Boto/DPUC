import { Button, Text } from "@paco_ua/pacoui";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CloseDPUC = ({id, redirect = false, estadoTipo, setEstado, show, setShow}) => {
    const BASE_URL_CREATION = process.env.REACT_APP_FETCHER + "creation/fecharDpuc?id=" + id;
    const BASE_URL_EDITION = process.env.REACT_APP_FETCHER + "edition/emEdicao?id=" + id + "&finished=" + true;

    const navigate = useNavigate();

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClose = () => setShow(false);

    const BASE_URL = estadoTipo === "C" ? BASE_URL_CREATION : BASE_URL_EDITION;
    const proxEstado = estadoTipo === "C" ? 3 : 5;

    const close = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL, {})
            .then(() => {
                setEstado(proxEstado);
                handleClose();
                if(redirect)
                    navigate("/dpuc/" + id);
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
                        Submeter { (estadoTipo === "C" && " para Aprovação")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Text as="p">
                        Tem a certeza que pretende submeter este DPUC  
                        <b>{ (estadoTipo === "C" && " para Aprovação")}</b>
                        ?
                    </Text>
                    <br/>
                    <Text as="p">
                        {
                        (estadoTipo === "C" &&
                            "O DPUC será revisto e aprovado pelos Serviços de Gestão Académica, não podendo fazer alterações.")
                        }
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O DPUC passará para o estado{" "}
                        {
                        (estadoTipo === "C" &&
                            <b>Fechado(3)</b>)
                        ||
                            <b>Aprovado(5)</b>
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