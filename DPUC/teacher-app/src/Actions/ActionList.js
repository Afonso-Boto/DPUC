import { Col, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Helper/Context";
import ApproveDPUC from "../Actions/ApproveDPUC";
import DeactivateDPUC from "../Actions/DeactivateDPUC";
import InApprovalDPUC from "../Actions/InApprovalDPUC";
import CloseDPUC from "../Actions/CloseDPUC";
import OpenDPUC from "../Actions/OpenDPUC";
import ChangeDR from "./ChangeDR";
import Selector from "../VisualComponents/Selector";
import { useNavigate } from "react-router-dom";
import CreateDPUC from "./CreateDPUC";

const ActionList = ({dpuc, setEstado, setResponsavel}) => {
    const navigate = useNavigate();
    const { userType } = useContext(UserContext);

    const [availableOptions, setOptions] = useState([]);

    const [showChangeDR, setShowChangeDR] = useState(false);
    const [showApprove, setShowApprove] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [showDeactive, setShowDeactivate] = useState(false);
    const [showInApproval, setShowInApproval] = useState(false);
    const [showOpen, setShowOpen] = useState(false);
    const [showCreate, setShowCreate] = useState(false);

    const options = [
        { value: "regente",     label: "Alterar Responsável da UC",   
            userType: "DUO",    estados: [1, 2, 3, 4, 5]},
        { value: "novo",        label: "Lançar Novo DPUC",  
            userType: "DUO",    estados: [5]},
        { value: "editar",      label: "Editar",            
            userType: "DR SGA", estados: [1, 2]},
        { value: "fechar",      label: "Submeter para Aprovação",            
            userType: "DR", estados: [2]},
        { value: "reabrir",     label: "Re-abrir",          
            userType: "SGA",    estados: [3, 4]},
        { value: "comaprov",    label: "Começar Aprovação", 
            userType: "SGA",    estados: [3]},
        { value: "aprovar",     label: "Aprovar",           
            userType: "SGA",    estados: [4]},
        { value: "desativar",   label: "Desativar",         
            userType: "SGA",    estados: [1, 2, 3, 4, 5]},
    ];

    const handleChange = (e) => {
        switch(e){
            case "regente":
                setShowChangeDR(true);
                break;
            case "novo":
                setShowCreate(true);
                break;
            case "editar":
                navigate("/edit/"+dpuc.id);
                break;
            case "fechar":
                setShowClose(true);
                break;
            case "reabrir":
                setShowOpen(true);
                break;
            case "comaprov":
                setShowInApproval(true);
                break;
            case "aprovar":
                setShowApprove(true);
                break;
            case "desativar":
                setShowDeactivate(true);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if(!userType)
            return;
        setOptions(options.filter((o) => (o.userType.includes(userType)) && (o.estados.includes(dpuc.estado.id))));
    }, [userType, dpuc.estado]);



    return ( 
        <>
            { availableOptions && availableOptions.length > 0 &&
                <Selector
                    options={availableOptions}
                    getOptionLabel ={(option)=>option.label}
                    getOptionValue ={(option)=>option.value}
                    onChange={e => handleChange(e.value)}
                    placeholder="Ações do DPUC"
                />
            }
            
            {userType === "SGA" && 
                <Col style={{paddingTop:"10px"}}>
                    <Row>
                        { (dpuc.estado.id === 3 || dpuc.estado.id === 4 || dpuc.estado.id === 6) &&
                            <Col>
                                <OpenDPUC id={dpuc.id} estadoTipo={dpuc.estadoTipo} setEstado={setEstado} show={showOpen} setShow={setShowOpen}/>
                            </Col>
                        }
                        { dpuc.estado.id === 3 &&
                            <Col>
                                <InApprovalDPUC id={dpuc.id} codigo={dpuc.codigo} setEstado={setEstado} show={showInApproval} setShow={setShowInApproval}/>
                            </Col>
                        }
                        { dpuc.estado.id === 4 &&
                            <Col>
                                <ApproveDPUC id={dpuc.id} codigo={dpuc.codigo} estadoTipo={dpuc.estadoTipo} setEstado={setEstado} show={showApprove} setShow={setShowApprove}/>
                            </Col>
                        }
                        { dpuc.estado.id !== 6 &&
                            <Col>
                                <DeactivateDPUC id={dpuc.id} setEstado={setEstado} show={showDeactive} setShow={setShowDeactivate}/>
                            </Col>
                        }
                    </Row>
                </Col>
            }
            {userType === "DR" && 
                <Col style={{paddingTop:"10px"}}>
                    <Row>
                        <Col>
                            <CloseDPUC id={dpuc.id} estadoTipo={dpuc.estadoTipo} setEstado={setEstado} show={showClose} setShow={setShowClose}/>
                        </Col>
                    </Row>
                </Col>
            }
            {userType === "DUO" && 
                <Col style={{paddingTop:"10px"}}>
                    <Row>
                        <Col>
                            <ChangeDR id={dpuc.id} responsavel={dpuc.responsavel} setResponsavel={setResponsavel} show={showChangeDR} setShow={setShowChangeDR}/>
                        </Col>
                        { (dpuc.estado.id === 5 || dpuc.estado.id === 10) &&
                            <Col>
                                <CreateDPUC id={dpuc.id} responsavel={dpuc.responsavel} show={showCreate} setShow={setShowCreate}/>
                            </Col>
                        }
                    </Row>
                </Col>
            }
        </>
     );
}
 
export default ActionList;