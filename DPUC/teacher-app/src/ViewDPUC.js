import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewDPUC = () => {

    const { id } = useParams();


    const navigate = useNavigate();

    const goToCreate = () => {
        navigate("/create");
    }



    const dpuc = {
            // comentários correspondem ao tipo de dados que vamos obter (e será necessário "converter")
            id: 1, 
            designacao: "Introdução à Programação", 
            areaCientifica: "Informática",         // será sigla 
            duracao: "Semestral",                
            responsavel: "Susana de Jesus Mota",            // será int 
            cargaHoraria:"",              // Não é necessário mostrar
            horasContacto:"1",           // quantas horas de OT
            docentes:["Rúben Amorim", "Sérgio Conceição"],  // será uma string
            docentesHoras:["TP: 2H", "P: 2H"],           // ???horas de aulas???
            horasTrabalho:"162",           // ects*27
            ects:"6",        
            objetivos:"Pretende-se dotar os alunos da capacidade para resolver problemas de pequena e média dimensão recorrendo à linguagem de programação Python e a algumas suas bibliotecas/módulos (p.ex., matplotlib, numpy, etc.).",
            conteudos:["- Sintaxe e semântica básicas de uma linguagem de alto nível (Python).",    "- Valores e tipos de dados primitivos. Variáveis, operadores e expressões.",    "- Funções, parâmetros e variáveis locais.",    "- Instruções de decisão.",    "- Instruções de repetição.",    "- Sequências: strings, listas, tuplos (e operações/métodos úteis).",    "- Conjuntos e dicionários (e operações/métodos úteis).",    "- Compreensões e expressões geradoras em listas e dicionários.",    "- Ficheiros de texto.",    "- Classes e Objetos.",    "- Utilização de módulos para cálculo científico e gráficos, etc. (numpy, matplotlib, ...)."]
            // será uma string
            ,
            coerenciaConteudos:"",      // Não é necessário mostrar
            metodologias:"As aulas teórico-práticas servem para apresentar, discutir e demonstrar a aplicação dos tópicos da matéria da unidade curricular.\nA abordagem seguida pressupõe a participação dos estudantes na discussão, procurando-se desenvolver competências que visam o raciocínio abstracto, a manipulação simbólica e a aprendizagem de técnicas gerais de resolução de problemas.\n A componente prática é composta por um conjunto de exercícios de programação que obrigam o estudante a aplicar e consolidar os conceitos apresentados nas aulas teórico-práticas.",
            coerenciaMetodologias:"",   // Não é necessário mostrar
            bibliografia:["[1] How to Think Like a Computer Scientist: Interactive Edition (existe em PT)","[2] Allen B. Downey, Think Python 2e (existe em PT)","[3] Charles R. Severance, Python for Everybody, Exploring Data Using Python 3 (em várias línguas)","[4] Horstmann and R. Necaise, Python for Everyone, 2nd. Ed., Wiley, 2016","[5] Punch and R. Enbody, The Practice of Computing using Python, 3rd. Ed., Pearson, 2017"],          // Será uma string
            observacoes:"Nenhuma",      // Não é necessário mostrar se não existir
            unidadeOrganica:"Departamento de Eletrónica, Telecomunicações e Informática (DETI)",         // int
            cursos:["Engenharia Informática"],  // Será só uma string
            regimeFaltas:"",            // Não é necessário mostrar se não existir
            linguas:["Português"],      // Será só uma string
            modalidade:"Presencial",
            requisitos:"Nenhum",
            ficheiros:"",               // Não é necessário mostrar se não existir
            dataAlteracao:"22-09-2021",
            paginaPublica:"",           // Não é necessário mostrar se não existir
            funcionamento:"",           // Corresponde ao campo "objetivos"
            aprendizagem:"",            // Não é necessário mostrar se não existir
            grau:"1º ciclo",            // Não é necessário mostrar se não existir
            avaliacao:"Discreta",       // Não é necessário mostrar se não existir
            periodo:"1º Semestre",      // Não é necessário mostrar se não existir
            estado:"",                  // Não é necessário mostrar
    }

    return ( 
        
        <ContentContainer padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        {dpuc.designacao}
                    </Text>
                    <hr/>
                </Col>
            </Row>
            <br/>


            {/* 
            ======================================
            Uso simples de variável
            ======================================
            */}
            <Row>
                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                    Objetivos
                </Text>
                <Text as="article" size="medium">
                    {/* Para usar uma variável: */}
                    { dpuc.objetivos }
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
                dpuc.regimeFaltas.length !== 0 &&
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Regime de Faltas
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.regimeFaltas }
                    </Text>
                </Row>
            }
            {
                /* Exemplo de algo que vai mostrar */
                dpuc.observacoes.length !== 0 &&
                <Row>
                    <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                        Observações
                    </Text>
                    <Text as="article" size="medium">
                        { dpuc.observacoes }
                    </Text>
                </Row>
            }
            {/* 
            ======================================
            Percorrer conteúdo de uma lista/array
            ======================================
            */}
            <br/>
            <Row>
                <Text as="h3" size="xlarge" color="#0EB4BD" fontWeight="400">
                    Bibliografia
                </Text>
            </Row>
            {
                dpuc.bibliografia.map((livro) =>(
                    <Text as="article" size="medium">
                        <li>{ livro }</li>
                    </Text>
                ))
            }
        </ContentContainer>
     );
}
 
export default ViewDPUC;