import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';

import { ContentContainer, Input, Select, Text, Button } from "@uaveiro/ui";



const EditDPUC = () => {

    const navigate = useNavigate();

    const [ucName, setName] = useState("Introdução à Programação");
    const [ucArea, setArea] = useState(-1);
    const [ucUO, setUO] = useState([]);
    const [ucCurso, setCurso] = useState([]);
    const [ucECTS, setECTS] = useState(6);
    const [ucDuracao, setDuracao] = useState(-1);
    const [ucSemestre, setSemestre] = useState(-1);
    const [ucModalidade, setModalidade] = useState(-1);
    const [ucGrau, setGrau] = useState(-1);
    const [ucHorasTP, setHorasTP] = useState(0);
    const [ucHorasT, setHorasT] = useState(0);
    const [ucHorasP, setHorasP] = useState(0);
    const [ucHorasOT, setHorasOT] = useState(0);
    const [ucIdioma, setIdioma] = useState([]);
    const [ucRegente, setRegente] = useState();
    const [ucDocentes, setDocentes] = useState([]);
    const [ucObjetivos, setObjetivos] = useState();
    const [ucWebpage, setWebpage] = useState();
    const [ucRequisitos, setRequisitos] = useState();
    const [ucConteudos, setConteudos] = useState();
    const [ucCoerenciaConteudos, setCoerenciaConteudos] = useState();
    const [ucMetodologias, setMetodologias] = useState();
    const [ucCoerenciaMetodologias, setCoerenciaMetodologias] = useState();
    const [ucRegFaltas, setRegFaltas] = useState();
    const [ucFuncPratica, setFuncPratica] = useState();

    const [ucAprendizagemAtiva, setAprendizagemAtiva] = useState();

    const [ucTipoAvaliacao, setTipoAvaliacao] = useState();

    const [ucBibliografia, setBibliografia] = useState();

    const [ucFicheiros, setFicheiros] = useState();

    const [ucObservacoes, setObservacoes] = useState();


    const areas = [
        {value: 1, label: "Informática"},
        {value: 2, label: "Matemática"},
        {value: 3, label: "Física"},
        {value: 4, label: "Psicologia"}
    ]
    const unidadesOrganicas = [
        {value: 1, label: "Departamento de Electrónica, Telecomunicações e Informática"},
        {value: 2, label: "Departamento de Biologia"},
        {value: 3, label: "Departamento de Física"},
        {value: 4, label: "Departamento de Matemática"}
    ]
    const cursos = [
        {value: 1, label: "Engenharia Informática"},
        {value: 2, label: "Engenharia de Computadores e Informática"},
        {value: 3, label: "Biologia"}
    ]
    const duracoes = [
        {value: 1, label: "Semestral"},
        {value: 2, label: "Anual"}
    ]
    const semestre = [
        {value: 1, label: "Primeiro"},
        {value: 2, label: "Segundo"}
    ]
    const modalidades = [
        {value: 1, label: "Presencial"},
        {value: 2, label: "À distância"},
        {value: 3, label: "Ambos"}
    ]
    const graus = [
        {value: 1, label: "Licenciatura (1º ciclo)"},
        {value: 2, label: "Mestrado (2º ciclo)"},
        {value: 3, label: "Doutoramento (3º ciclo)"}
    ]
    const idiomas = [
        {value: 1, label: "Português"},
        {value: 2, label: "Inglês"},
        {value: 3, label: "Espanhol"}
    ]
    const docentes = [
        {value: 1, label: "15777 - Luís Carlos Almeida da Cunha"},
        {value: 2, label: "10244 - Cristiano Ronaldo dos Santos Aveiro"},
        {value: 3, label: "9525 - Luís Filipe Madeira Caeiro Figo"}
    ]
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleBack = () => {
        navigate("/");
    }

    return ( 
        <ContentContainer padding="40px" >
            <div className="row">
                <div className="col-lg">
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Editar Dossier Pedagógico
                    </Text>
                    <hr/>
                </div>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Button variant="default" onClick={handleBack} >Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={handleSubmit}>Guardar</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary">Criar</Button>
                    </Col>
                </Row>
                <div className="row" style={{paddingTop:"10px"}}>
                    <div className="col">
                        <i>Nota: Campos assinalados com * são opcionais</i>
                    </div>
                </div>
                {/* Nome da UC e UO */}
                <Row>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            {ucName}
                        </Text>
                    </Col>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade Orgânica
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            {ucUO}
                        </Text>
                    </Col>
                </Row>
                {/* ECTS*/}
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={"auto"}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            {ucRegente}
                        </Text>
                    </Col>
                    <Col>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            {ucECTS}
                        </Text>
                    </Col>
                </Row>
                {/* Curso(s) de lecionacionação e Grau do Ciclo de Estudos*/}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Curso(s) de lecionação
                        </Text>
                        <Select isMulti placeholder="Selecione o(s) curso(s) de lecionação da UC..." variant="black" 
                            options={cursos}
                            onChange={(e) => setCurso(Array.from(e, (v => v.value)))}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Grau do Ciclo de estudos
                        </Text>
                        <Select placeholder="Selecione o ciclo de estudos da UC" variant="black" 
                            options={graus}
                            onChange={(e) => setGrau(e.value)}
                        />
                    </div>
                </div>
                {/* Idiomas de lecionação e Modalidade de Lecionação */}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Área Científica
                        </Text>
                        <Select placeholder="Selecione a área da UC..." variant="black" 
                            options={areas}
                            onChange={(e) => setArea(e.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Idioma(s) de lecionação
                        </Text>
                        <Select isMulti placeholder="Selecione o(s) idioma(s) de lecionação da UC..." variant="black" 
                            options={idiomas}
                            onChange={(e) => setIdioma(Array.from(e, (v => v.value)))}
                        />
                    </div>
                    
                </div>
                {/* Duração, Semestre e Página Pública*/}
                <div className="row row-pad">
                    <div className="col-lg-2">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Duração
                        </Text>
                        <Select placeholder="Duração da UC" variant="black" 
                            options={duracoes}
                            onChange={(e) => setDuracao(e.value)}
                        />
                    </div>
                    {
                        <div className="col-lg-2" style={{visibility: ucDuracao === 1 ? 'visible' : 'hidden' }}>
                            <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                                Semestre*
                            </Text>
                            <Select placeholder="Semestre da UC" variant="black" 
                                options={semestre}
                                onChange={(e) => setSemestre(e.value)}
                            />
                        </div>
                    }
                    
                    <div className="col-lg-8">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Página Pública da UC*
                        </Text>
                        <Input placeholder="Insira o URL da página da UC..." border="1px solid #424242" color="#424242" 
                            value={ucWebpage}
                            onChange={(e) => setWebpage(e.target.value)}
                        />
                    </div>
                </div>
                {/* Carga Letiva Semanal*/}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Carga Letiva Semanal (em Horas) - ver como fiz no create para os campos
                            nao ficarem enormes
                        </Text>
                        <div className="row">
                            <div className="col-lg-2">
                                <Text size="large" color="#424242" fontWeight="300">
                                    TP
                                </Text>
                                
                                <Input border="1px solid #424242" color="#424242" required type="number"
                                    min={0} max={12}
                                    value={ucHorasT}
                                    onChange={(e) => setHorasT(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-2">
                                <Text size="large" color="#424242" fontWeight="300">
                                    T
                                </Text>
                                <Input border="1px solid #424242" color="#424242" required type="number"
                                    min={0} max={12}
                                    value={ucHorasTP}
                                    onChange={(e) => setHorasTP(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-2">
                                <Text size="large" color="#424242" fontWeight="300">
                                    P
                                </Text>
                                <Input border="1px solid #424242" color="#424242" required type="number"
                                    min={0} max={12}
                                    value={ucHorasP}
                                    onChange={(e) => setHorasP(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-2">
                                <Text size="large" color="#424242" fontWeight="300">
                                    OT
                                </Text>
                                <Input border="1px solid #424242" color="#424242" required type="number"
                                    min={0} max={12}
                                    value={ucHorasOT}
                                    onChange={(e) => setHorasOT(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Modalidade de Lecionação
                        </Text>
                        <Select placeholder="Selecione a modalidade de lecionação da UC" variant="black" 
                            options={modalidades}
                            onChange={(e) => setModalidade(e.value)}
                        />
                    </div>
                </div>
                {/* Docentes da UC */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docentes Associados à UC
                        </Text>
                        <Select isMulti placeholder="Selecione docentes associados à UC..." variant="black"
                            options={docentes}
                            onChange={(e) => setDocentes(Array.from(e, (v => v.value)))}
                        />
                    </div>
                </div>
                {/* Objetivos de aprendizagem */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Objetivos de aprendizagem
                        </Text>
                        <Input placeholder="Especifique os objetivos de aprendizagem (conhecimentos, aptidões e competências a desenvolver pelos estudantes)" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucObjetivos}
                            onChange={(e) => setObjetivos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Pré-requisitos */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Pré-requisitos da UC
                        </Text>
                        <Input placeholder="Especifique os requisitos da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucRequisitos}
                            onChange={(e) => setRequisitos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Conteúdos programáticos */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Conteúdos programáticos
                        </Text>
                        <Input placeholder="Especifique os conteúdos programáticos da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucConteudos}
                            onChange={(e) => setConteudos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Demonstração da coerência dos conteúdos programáticos com os objectivos da unidade curricular. */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Coerência dos Conteúdos programáticos
                        </Text>
                        <Input placeholder="Demonstre a coerência dos conteúdos programáticos com os objectivos da unidade curricular" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucCoerenciaConteudos}
                            onChange={(e) => setCoerenciaConteudos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Metodologias de ensino */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Metodologias de ensino
                        </Text>
                        <Input placeholder="Especifique as metodologias de ensino da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucMetodologias}
                            onChange={(e) => setMetodologias(e.target.value)}
                        />
                    </div>
                </div>
                {/* Demonstração da coerência das metodologias de ensino com os objectivos de aprendizagem da unidade */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Coerência dos Conteúdos programáticos
                        </Text>
                        <Input placeholder="Demonstre a coerência das metodologias de ensino com os objectivos de aprendizagem da unidade" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucCoerenciaMetodologias}
                            onChange={(e) => setCoerenciaMetodologias(e.target.value)}
                        />
                    </div>
                </div>
                { /* Regime de Faltas */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Regime de Faltas*
                        </Text>
                        <Input placeholder="Indique o regime de faltas da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucRegFaltas}
                            onChange={(e) => setRegFaltas(e.target.value)}
                        />
                    </div>
                </div>
                { /* Funcionamento da Componente Prática */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Funcionamento da Componente Prática*
                        </Text>
                        <Input placeholder="Indique o funcionamento da componente prática da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucFuncPratica}
                            onChange={(e) => setFuncPratica(e.target.value)}
                        />
                    </div>
                </div>
                { /* Aprendizagem ativa */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Aprendizagem ativa*
                        </Text>
                        <Input placeholder="Apresente as metodologias de ensino que promovam a aprendizagem ativa e a autonomia e fomentem a ligação entre investigação e ensino" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucAprendizagemAtiva}
                            onChange={(e) => setAprendizagemAtiva(e.target.value)}
                        />
                    </div>
                </div>
                { /* Tipo de avaliação */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Tipo de avaliação
                        </Text>
                        <Input placeholder="Indique o(s) tipo(s) de avaliação da UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucTipoAvaliacao}
                            onChange={(e) => setTipoAvaliacao(e.target.value)}
                        />
                    </div>
                </div>
                { /* Bibliografia de consulta */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Bibliografia de consulta
                        </Text>
                        <Input placeholder="Indique a bibliografia principal/obrigatória (com pelo menos uma com data de edição igual ou superior a 2015)" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucBibliografia}
                            onChange={(e) => setBibliografia(e.target.value)}
                        />
                    </div>
                </div>
                { /* Ficheiros */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Ficheiros*
                        </Text>
                        <Input placeholder="URL de ficheiros extras úteis à UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucFicheiros}
                            onChange={(e) => setFicheiros(e.target.value)}
                        />
                    </div>
                </div>
                { /* Observações */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Observações
                        </Text>
                        <Input placeholder="Indique informação relevante e variada sobre a UC" border="1px solid #424242" color="#424242" required 
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucObservacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>
                </div>
                {/*
                Exemplos para mostrar campos selecionados
                    {ucName}
                    <br/>
                    {areas.filter(area => area.value === ucArea).length > 0 && areas.filter(area => area.value === ucArea)[0].label}
                    <br/>
                    {ucUO.map((uo) => <li>{uo}</li>)}
                    <br/>
                    {ucCurso.map((uo) => <li>{uo}</li>)}
                */}
            </form>
        </ContentContainer>
     );
}
 
/* 
Como implementar ???????????????
Carga horária do docentes responsável
Carga horária dos docentes
Horas de contacto (OT)
*/
export default EditDPUC;