import { Col, Row } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../Helper/Context";
import ApproveDPUC from "../Actions/ApproveDPUC";
import DeactivateDPUC from "../Actions/DeactivateDPUC";
import InApprovalDPUC from "../Actions/InApprovalDPUC";
import CloseDPUC from "../Actions/CloseDPUC";
import OpenDPUC from "../Actions/OpenDPUC";
import Selector from "../VisualComponents/Selector";
import { useNavigate } from "react-router-dom";

const ActionList = ({dpuc, setEstado}) => {
    const navigate = useNavigate();
    const { userType } = useContext(UserContext);

    const [availableOptions, setOptions] = useState([]);

    const [showApprove, setShowApprove] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [showDeactive, setShowDeactivate] = useState(false);
    const [showInApproval, setShowInApproval] = useState(false);
    const [showOpen, setShowOpen] = useState(false);

    const options = [
        { value: "regente",     label: "Alterar Regente",   
            userType: "DUO",    estados: [1, 2, 3, 4, 5]},
        { value: "novo",        label: "Lançar Novo DPUC",  
            userType: "DUO",    estados: [5]},
        { value: "editar",      label: "Editar",            
            userType: "DR SGA", estados: [1, 2]},
        { value: "fechar",      label: "Fechar",            
            userType: "DR SGA", estados: [2]},
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
                // Abrir página de edição de regente
                break;
            case "novo":
                // Abrir página de criar novo DPUC
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
        console.log(availableOptions);
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
                <Col md={6} style={{paddingTop:"10px"}}>
                    <Row>
                        { (dpuc.estado.id === 3 || dpuc.estado.id === 4 || dpuc.estado.id === 6) &&
                            <Col>
                                <OpenDPUC id={dpuc.id} setEstado={setEstado} show={showOpen} setShow={setShowOpen}/>
                            </Col>
                        }
                        { dpuc.estado.id === 3 &&
                            <Col>
                                <InApprovalDPUC id={dpuc.id} codigo={dpuc.codigo} setEstado={setEstado} show={showInApproval} setShow={setShowInApproval}/>
                            </Col>
                        }
                        { dpuc.estado.id === 4 &&
                            <Col>
                                <ApproveDPUC id={dpuc.id} codigo={dpuc.codigo} setEstado={setEstado} show={showApprove} setShow={setShowApprove}/>
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
                <Col md={4} style={{paddingTop:"10px"}}>
                    <Row>
                        <Col>
                            <CloseDPUC id={dpuc.id} setEstado={setEstado} show={showClose} setShow={setShowClose}/>
                        </Col>
                    </Row>
                </Col>
            }
        </>
     );
}
 
export default ActionList;