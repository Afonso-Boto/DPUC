import { Button, Text } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { EntitiesContext } from "../Helper/Context";
import Selector from "../VisualComponents/Selector";
import { useNavigate } from "react-router-dom";

const CreateDPUC = ({ id, show, setShow, responsavel }) => {
    const BASE_URL = "http://localhost:82/edition/definicaoRegente?id=" + id + "&regenteid=";

    const navigate = useNavigate();
    const {docentes} = useContext(EntitiesContext);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [regente, setRegente] = useState(responsavel);

    const handleClose = () => {
        setRegente(responsavel);
        setShow(false);
    }

    const approve = () => {
        setError(false);
        setLoading(true);
        axios
            .put(BASE_URL + regente.id)
            .then((response) => {
                navigate("/dpuc/"+response.data);
                handleClose();
            })
            .catch((error) => {
                setError(true);
            })
            .finally(() => {
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
                        Lançar Nova Versão de DPUC
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Row>
                        <Col sm="auto">
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Escolha a/o Responsável da UC:
                                </Text>
                            </h3>
                        </Col>
                    </Row>
                    <Selector
                        options={docentes}
                        value={regente}
                        getOptionLabel ={(option)=>("[" + option.nmec + "] " + option.nome)}
                        getOptionValue ={(option)=>option.id}
                        onChange={(e) => setRegente(e)}
                        placeholder="Selecione o novo docente responsável pela UC..."
                    />
                    <Text as="i" size="small">
                        Ao lançar um DPUC é necessário definir a/o Responsável. 
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        Toda a informação do DPUC atual será copiada para o novo DPUC podendo fazer alterações.
                    </Text>
                    <br/>
                    <Text as="i" size="small">
                        O novo DPUC ficará no estado <b>Em Edição(2)</b>.
                    </Text>
                    {   error &&
                        <>
                        <br/>
                        <Text as="i" size="small" color="red">
                            Ocorreu um erro ao lançar o novo DPUC.
                        </Text>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button primary style={{fontSize:"100%"}} onClick={approve} >
                        {(loading && "A Lançar Novo DPUC...") || ("Lançar Novo DPUC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default CreateDPUC;