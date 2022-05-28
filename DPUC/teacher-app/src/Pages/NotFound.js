import { Link } from "react-router-dom";
import { InfoBox } from "@paco_ua/pacoui";
import { React } from "react";
import { Col, Row } from "react-bootstrap";

const NotFound = () => {
    return ( 
        <div className="not-found" style={{"text-align":"center"}}>
            <Row>
                <Col></Col>
                <Col md="auto">
                    <InfoBox title="A página que está a tentar aceder não existe">
                        <Link to="/">Voltar à página inicial.</Link>
                    </InfoBox>
                </Col>
                <Col></Col>
            </Row>

        </div>
     );
}
 
export default NotFound;