import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "./useFetch";

const ViewDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = "http://localhost:8000/dpuc/" + id;

    const URL_UOS = "http://localhost:8000/uos";

    const URL_AREAS = "http://localhost:8000/areas";
    const URL_CURSOS = "http://localhost:8000/cursos";
    const URL_DURACOES = "http://localhost:8000/duracoes";
    const URL_SEMESTRE = "http://localhost:8000/semestres";
    const URL_MODALIDADES = "http://localhost:8000/modalidades";
    const URL_GRAUS = "http://localhost:8000/graus";
    const URL_IDIOMAS = "http://localhost:8000/idiomas";
    const URL_DOCENTES = "http://localhost:8000/docentes";

    const navigate = useNavigate();

    const goBack = () => {
        navigate("/");
    }

    const { data: dpuc , loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    const { data: uos , loading: loadUOS, error: errorUOS } = useFetch(URL_UOS);
    const { data: cursos , loading: loadCursos, error: errorCursos } = useFetch(URL_CURSOS);
    const { data: graus , loading: loadGraus, error: errorGraus } = useFetch(URL_GRAUS);
    const { data: areas , loading: loadAreas, error: errorAreas } = useFetch(URL_AREAS);
    const { data: idiomas , loading: loadIdiomas, error: errorIdiomas } = useFetch(URL_IDIOMAS);
    const { data: duracoes , loading: loadDuracoes, error: errorDuracoes } = useFetch(URL_DURACOES);
    const { data: semestre , loading: loadSemestre, error: errorSemestre } = useFetch(URL_SEMESTRE);
    const { data: modalidades , loading: loadModalidades, error: errorModalidades } = useFetch(URL_MODALIDADES);
    const { data: docentes , loading: loadDocentes, error: errorDocentes } = useFetch(URL_DOCENTES);


    return ( 
        <ContentContainer padding="40px" >

            <Row>
                <Col>
                    { dpuc && 
                        <Text as="h3" size="xLarge" fontWeight="400"> 
                            {dpuc.designacao}
                        </Text>
                    }
                    <hr/>
                </Col>
            </Row>
            <br/>
            { dpuc && 
            <ContentContainer> 
                { dpuc.objetivos &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Objetivos
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.objetivos }
                        </Text>
                    </Row>
                }
                
                <br/>
                {
                    dpuc.observacoes && dpuc.observacoes.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Observações
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.observacoes }
                        </Text>
                        <br/>
                    </Row>
                }
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Unidade orgânica
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.unidadeOrganica }
                    </Text>
                </Row>
                <br/>
                {
                    dpuc.aprendizagem && dpuc.aprendizagem.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Aprendizagem
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.aprendizagem }
                        </Text>
                        <br/>
                    </Row>
                }
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Duração
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.duracao }
                    </Text>
                </Row>
                <br/>
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Docentes
                    </Text>
                </Row>
                {
                    dpuc.docentes.split("$").map((docente) =>(
                        <Text as="article" size="medium">
                            <li>{ docente }</li>
                        </Text>
                    ))
                }
                <br/>
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Horas de contacto em OT
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.horasContacto }
                    </Text>
                </Row>
                
                <br/>
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Horas de trabalho semestral esperadas
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.horasTrabalho }
                    </Text>
                </Row>
                <br/>
                {/* 
                ======================================
                Verificar condição e mostrar conteúdo
                ======================================

                    Em geral basta fazer uma condução, como se fosse um if e
                    mostrar o conteúdo após &&
                */}
                {
                    /* Exemplo de algo que não vai mostrar */
                    dpuc.regimeFaltas && dpuc.regimeFaltas.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Regime de Faltas
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.regimeFaltas }
                        </Text>
                        <br/>
                    </Row>  
                }
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Modalidade
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.modalidade }
                    </Text>
                </Row>
                <br/>
                {
                    dpuc.grau && dpuc.grau.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Grau
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.grau }
                        </Text>
                    </Row>
                }
                <br/>
                {
                    dpuc.periodo && dpuc.periodo.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Período
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.periodo }
                        </Text>
                    </Row>
                }
                <br/>
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Requisitos
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.requisitos }
                    </Text>
                </Row>
                <br/>
                {
                    dpuc.avaliacao && dpuc.avaliacao.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Avaliação
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.avaliacao }
                        </Text>
                    </Row>
                }
                <br/>
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Metodologias
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.metodologias }
                    </Text>
                </Row>
                <br/>
                {
                    dpuc.coerenciaMetodologias && dpuc.coerenciaMetodologias.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Coerência das Metodologias
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.coerenciaMetodologias }
                        </Text>
                        <br/>
                    </Row>
                }
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Conteúdos
                    </Text>
                </Row>
                { dpuc.conteudos &&
                    dpuc.conteudos.split("$").map((conteudo) =>(
                        <Text as="article" size="medium">
                            <li>{ conteudo }</li>
                        </Text>
                    ))
                }
                <br/>
                {
                    dpuc.coerenciaConteudos && dpuc.coerenciaConteudos.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Coerência dos Conteúdos
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.coerenciaConteudos }
                        </Text>
                        <br/>
                    </Row>
                }
                {/* 
                ======================================
                Percorrer conteúdo de uma lista/array
                ======================================
                */}
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Bibliografia
                    </Text>
                </Row>
                { dpuc.bibliografia && 
                    dpuc.bibliografia.split("\n").map((livro) =>(
                        <Text as="article" size="medium">
                            <li>{ livro }</li>
                        </Text>
                    ))
                }
                <br/>
                {
                    /* Exemplo de algo que vai mostrar */
                    dpuc.ficheiros && dpuc.ficheiros.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Ficheiros
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.ficheiros }
                        </Text>
                    </Row>
                }
                {
                    /* Exemplo de algo que vai mostrar */
                    dpuc.estado && dpuc.estado.length !== 0 &&
                    <Row>
                        <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                            Estado
                        </Text>
                        <Text as="article" size="medium">
                            { dpuc.estado }
                        </Text>
                    </Row>
                }
            </ContentContainer>
            }
        </ContentContainer>
     );
}
 
export default ViewDPUC;