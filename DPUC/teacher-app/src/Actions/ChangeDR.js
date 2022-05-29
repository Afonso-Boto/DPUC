import { Button, Text } from "@paco_ua/pacoui";
import { Modal, Col, Row } from "react-bootstrap";
import { useState, useContext } from "react";
import axios from "axios";
import { EntitiesContext } from "../Helper/Context";
import Selector from "../VisualComponents/Selector";

const ChangeDR = ({id, responsavel, setResponsavel, show, setShow}) => {
    const BASE_URL = "http://localhost:82/edition/setRegente?id=" + id + "&regenteid=";

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
            .then(() => {
                setResponsavel(regente);
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
                        Alterar Responsável da Unidade Curricular
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    <Row>
                        <Col sm="auto">
                            <h3>
                                <Text size="large" color="primary" fontWeight="400">
                                    Escolha o novo Responsável:
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
                    {   error &&
                        <>
                        <br/>
                        <Text as="i" size="small" color="red">
                            Ocorreu um erro ao alterar o regente da Unidade Curricular.
                        </Text>
                        </>
                    }
                </Modal.Body>

                <Modal.Footer>
                    <Button action style={{fontSize:"100%"}} onClick={handleClose} >
                        Cancelar
                    </Button>
                    <Button primary style={{fontSize:"100%"}} onClick={approve} >
                        {(loading && "A alterar Responsável da UC...") || ("Alterar Responsável da UC")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
     );
}
 
export default ChangeDR;