import { Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import useFetch from '../Helper/useFetch';
import { Text} from "@paco_ua/pacoui"
import DPUCList from "./DPUCList";
/*a faltar: onClick => para DPUC em edicao, em criacao e fechadas
            search bar com o template ua e passar a ser dinamica
             */

const DashboardSGA  = () => {

    const navigate = useNavigate();

    const URL_DPUC = "http://localhost:8000/dpuc";

    const { data: dpuc , loading, error } = useFetch(URL_DPUC);

    return ( 
        <Container padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="medium"> 
                        Gestão de DPUCs
                    </Text>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Text as="h3" color="primary" size="large" fontWeight="medium">
                        Olá, SGA! 
                    </Text>
                </Col>
            </Row>
            <br/>
            <DPUCList dpucs={dpuc} loading={loading} error={error} canCreate={false}/>
        </Container>
     );
}
 
export default DashboardSGA;