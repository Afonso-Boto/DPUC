import { Text } from "@paco_ua/pacoui";
import { Col, Row } from "react-bootstrap";

const Footer = () => {
    return ( 
        <Row>
            <Col md="12" style={{textAlign: "center", paddingBottom:"20px"}}>
                <hr className="footer-hr"/>
                <Text size="xSmall">
                    Universidade de Aveiro - Projeto em Informática 2021/2022 - Grupo 6 - 
                    <a href="https://github.com/Afonso-Boto/DPUC" target="_blank">
                        {" "} Repositório
                    </a>
                </Text>
            </Col>
        </Row>

     );
}
 
export default Footer;