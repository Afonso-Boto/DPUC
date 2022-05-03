import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { ContentContainer, Input, Select, Text, Button, AnimatedBackground, SelectLoading } from "@uaveiro/ui";
import useFetch from "./useFetch";
import axios from "axios";
import useParseDPUCData from "./Utils/useParseDPUCData";
import getFormattedDPUC from "./Utils/getFormattedDPUC";



const EditDPUC = () => {

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

    
    const [ucArea, setArea] = useState("");
    const [ucDuracao, setDuracao] = useState(-1);
    const [ucSemestre, setSemestre] = useState(-1);
    const [ucModalidade, setModalidade] = useState(-1);
    const [ucGrau, setGrau] = useState(-1);
    const [ucCurso, setCurso] = useState([]);
    const [ucIdioma, setIdioma] = useState([]);
    const [ucDocentes, setDocentes] = useState([]);
    const [ucHorasTP, setHorasTP] = useState(0);
    const [ucHorasT, setHorasT] = useState(0);
    const [ucHorasP, setHorasP] = useState(0);
    const [ucHorasOT, setHorasOT] = useState(0);
    const [ucObjetivos, setObjetivos] = useState("");
    const [ucWebpage, setWebpage] = useState("");
    const [ucRequisitos, setRequisitos] = useState("");
    const [ucConteudos, setConteudos] = useState("");
    const [ucCoerenciaConteudos, setCoerenciaConteudos] = useState("");
    const [ucMetodologias, setMetodologias] = useState("");
    const [ucCoerenciaMetodologias, setCoerenciaMetodologias] = useState("");
    const [ucRegFaltas, setRegFaltas] = useState("");
    const [ucFuncPratica, setFuncPratica] = useState("");
    const [ucAprendizagemAtiva, setAprendizagemAtiva] = useState("");
    const [ucTipoAvaliacao, setTipoAvaliacao] = useState("");
    const [ucBibliografia, setBibliografia] = useState("");
    const [ucFicheiros, setFicheiros] = useState("");
    const [ucObservacoes, setObservacoes] = useState("");
    const [ucDataAlter, setDataAlter] = useState("");

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

    const { parsing: loadParse, error: errorParse } = useParseDPUCData(dpuc, areas, cursos, graus, idiomas, duracoes, semestre, modalidades, docentes, setArea, setDuracao, setSemestre, setModalidade, setGrau, setCurso, setIdioma, setDocentes, setHorasTP, setHorasT, setHorasP, setHorasOT, setObjetivos, setWebpage, setRequisitos, setConteudos, setCoerenciaConteudos, setMetodologias, setCoerenciaMetodologias, setRegFaltas, setFuncPratica, setAprendizagemAtiva, setTipoAvaliacao, setBibliografia, setFicheiros, setObservacoes, setDataAlter);
    const [ error, setError ] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setError(false);
/*
        const uc = { designacao: ucName, unidadeOrganica: ucUO, responsavel: ucRegente, ects: ucECTS,
            estado: "Em Criação", dataAlteracao: ""};
*/
        

        axios
            .put(URL_DPUC, getFormattedDPUC(dpuc, "Em Edição", ucArea, ucDuracao, ucSemestre, ucModalidade, ucGrau, ucCurso, ucIdioma, ucDocentes, ucHorasTP, ucHorasT, ucHorasP, ucHorasOT, ucObjetivos, ucWebpage, ucRequisitos, ucConteudos, ucCoerenciaConteudos, ucMetodologias, ucCoerenciaMetodologias, ucRegFaltas, ucFuncPratica, ucAprendizagemAtiva, ucTipoAvaliacao, ucBibliografia, ucFicheiros, ucObservacoes))
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setError(true);
            });
    }
    const handleBack = () => {
        navigate("/");
    }


    return ( 
        <ContentContainer padding="40px" >
            <Row>
                <Col>
                    <Text as="h3" size="xLarge" fontWeight="400"> 
                        Editar Dossier Pedagógico
                    </Text>
                    <hr/>
                </Col>
            </Row>
            <br/>
            { (loadDPUC || loadParse) && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { dpuc && !loadDPUC && !loadParse &&
            <form onSubmit={handleSubmit}>
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Button variant="default" onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" style={{fontSize:"100%"}}>Guardar</Button>
                    </Col>
                </Row>
                <hr className="custom-hr"/>
                
                {/* Nome da UC e UO */}
                <Row>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            { dpuc.designacao}
                        </Text>
                    </Col>
                    <Col lg={6}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade Orgânica
                        </Text>
                        { loadUOS && <AnimatedBackground height="20px" width="40%"></AnimatedBackground> }
                        { uos && !loadUOS &&
                            <Text as="h4" size="medium" fontWeight="400">
                                { uos.filter((uo) => uo.id === dpuc.unidadeOrganica)[0].nome}
                            </Text>
                        }
                    </Col>
                </Row>
                {/* Regente e ECTS*/}
                <Row style={{paddingTop:"10px"}}>
                    <Col lg={"auto"}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                        { loadDocentes && <AnimatedBackground height="20px" width="40%"></AnimatedBackground> }
                        { docentes && !loadDocentes &&
                            <Text as="h4" size="medium" fontWeight="400">
                                {docentes.filter((docente) => docente.cod_int === dpuc.responsavel)[0].nome_completo}
                            </Text>
                        }
                    </Col>
                    <Col lg={"auto"}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            { dpuc && dpuc.ects}
                        </Text>
                    </Col>
                </Row>
                <hr className="custom-hr"/>
                {/* Curso(s) de lecionacionação e Grau do Ciclo de Estudos*/}
                <div className="row" style={{paddingTop:"10px"}}>
                    <div className="col">
                        <i>Nota: Campos assinalados com * são opcionais</i>
                    </div>
                </div>
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Curso(s) de lecionação
                        </Text>
                        { loadCursos && <SelectLoading />}
                        { errorCursos && !loadCursos && <Select disabled placeholder="Não foi possível obter os cursos" variant="black" options={[]}/>}
                        { cursos && !loadCursos &&
                            <Select isMulti placeholder="Selecione o(s) curso(s) de lecionação da UC..." variant="black" 
                                options={cursos}
                                value={ucCurso}
                                //onChange={(e) => setCurso(Array.from(e, (v => v.id)))}
                                onChange={(e) => setCurso(Array.from(e, (v => v)))}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Grau do Ciclo de estudos
                        </Text>
                        { loadGraus && <SelectLoading />}
                        { errorGraus && !loadGraus && <Select disabled placeholder="Não foi possível obter os graus de ciclo de estudo" variant="black" options={[]}/>}
                        { graus && !loadAreas &&
                            <Select placeholder="Selecione o ciclo de estudos da UC" variant="black" 
                                options={graus}
                                value={ucGrau}
                                onChange={(e) => setGrau(e)}
                                getOptionLabel ={(option)=>(option.nome + " (" + option.ciclo + "º ciclo)" )}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                </div>
                {/* Área Científica e Idiomas de lecionação */}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Área Científica
                        </Text>
                        { loadAreas && <SelectLoading />}
                        { errorAreas && !loadAreas && <Select disabled placeholder="Não foi possível obter as Áreas Científicas" variant="black" options={[]}/>}
                        { areas && !loadAreas &&
                            <Select placeholder="Selecione a área da UC..." variant="black" 
                                options={areas}
                                value={ucArea}
                                onChange={(e) => setArea(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>(option.sigla)}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Idioma(s) de lecionação
                        </Text>
                        { loadIdiomas && <SelectLoading />}
                        { errorIdiomas && !loadIdiomas && <Select disabled placeholder="Não foi possível obter os Idiomas de lecionação" variant="black" options={[]}/>}
                        { idiomas && !loadIdiomas &&
                            <Select isMulti placeholder="Selecione o(s) idioma(s) de lecionação da UC..." variant="black" 
                                options={idiomas}
                                value={ucIdioma}
                                onChange={(e) => setIdioma(Array.from(e, (v => v)))}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                </div>
                {/* Carga Letiva, Duração, Semestre */}
                <div className="row row-pad">
                <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Carga Letiva Semanal (em Horas)
                        </Text>
                        <Row>
                            <Col lg={"auto"}>
                                <Row>
                                    <Col lg={"auto"}>
                                        <Text as="h3" size="large" fontWeight="400">
                                            TP
                                        </Text>
                                    </Col>
                                    <Col lg={"auto"}>
                                        <Input border="1px solid #424242" color="#424242"  type="number"
                                            min={0} max={12}
                                            value={ucHorasTP}
                                            onChange={(e) => setHorasTP(e.target.value)}
                                            style={{width:"50px"}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={"auto"}>
                                <Row>
                                    <Col lg={"auto"}>
                                    <Text as="h3" size="large" fontWeight="400">
                                    T
                                </Text>
                                    </Col>
                                    <Col lg={"auto"}>
                                        <Input border="1px solid #424242" color="#424242"  type="number"
                                        min={0} max={12}
                                        value={ucHorasT}
                                        onChange={(e) => setHorasT(e.target.value)}
                                        style={{width:"50px"}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={"auto"}>
                                <Row>
                                    <Col lg={"auto"}>
                                        <Text as="h3" size="large" fontWeight="400">
                                            P
                                        </Text>
                                    </Col>
                                    <Col lg={"auto"}>
                                        <Input border="1px solid #424242" color="#424242"  type="number"
                                        min={0} max={12}
                                        value={ucHorasP}
                                        onChange={(e) => setHorasP(e.target.value)}
                                        style={{width:"50px"}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col lg={"auto"}>
                                <Row>
                                    <Col lg={"auto"}>
                                        <Text as="h3" size="large" fontWeight="400">
                                            OT
                                        </Text>
                                    </Col>
                                    <Col lg={"auto"}>
                                        <Input border="1px solid #424242" color="#424242"  type="number"
                                        min={0} max={12}
                                        value={ucHorasOT}
                                        onChange={(e) => setHorasOT(e.target.value)}
                                        style={{width:"50px"}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="col-lg-3">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Duração
                        </Text>
                        { loadDuracoes && <SelectLoading />}
                        { errorDuracoes && !loadDuracoes && <Select disabled placeholder="Não foi possível obter as Durações de lecionação" variant="black" options={[]}/>}
                        { duracoes && !loadDuracoes &&
                            <Select placeholder="Duração da UC" variant="black" 
                                options={duracoes}
                                value={ucDuracao}
                                onChange={(e) => setDuracao(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    { ucDuracao.nome === "Semestral" &&
                        <div className="col-lg-3">
                            <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                                Semestre*
                            </Text>
                            { loadSemestre && <SelectLoading />}
                            { errorSemestre && !loadSemestre && <Select disabled placeholder="Não foi possível obter os Semestres de lecionação" variant="black" options={[]}/>}
                            { semestre && !loadSemestre &&
                                <Select placeholder="Semestre da UC" variant="black" 
                                    options={semestre}
                                    value={ucSemestre}
                                    onChange={(e) => setSemestre(e)}
                                    getOptionLabel ={(option)=>(option.nome)}
                                    getOptionValue ={(option)=>option.id}
                                />
                            }
                        </div>
                    }
                </div>
                {/* Modalidade e Página Pública*/}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Modalidade de Lecionação
                        </Text>
                        { loadModalidades && <SelectLoading />}
                        { errorModalidades && !loadModalidades && <Select disabled placeholder="Não foi possível obter as Modalidades de lecionação" variant="black" options={[]}/>}
                        { modalidades && !loadModalidades &&
                            <Select placeholder="Selecione a modalidade de lecionação da UC" variant="black" 
                                options={modalidades}
                                value={ucModalidade}
                                onChange={(e) => setModalidade(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Página Pública da UC*
                        </Text>
                        <Input placeholder="Insira o URL da página da UC..." border="1px solid #424242" color="#424242" 
                            value={ucWebpage}
                            onChange={(e) => setWebpage(e.target.value)}
                        />
                    </div>
                </div>
                {/* Docentes da UC */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docentes Associados à UC
                        </Text>
                        { loadDocentes && <SelectLoading />}
                        { errorDocentes && !loadDocentes && <Select disabled placeholder="Não foi possível obter os Docentes" variant="black" options={[]}/>}
                        { docentes && !loadDocentes &&
                            <Select isMulti placeholder="Selecione docentes associados à UC..." variant="black"
                            options={docentes}
                            value={ucDocentes}
                            onChange={(e) => setDocentes(Array.from(e, (v => v)))}
                            getOptionLabel ={(option)=>(option.nome_completo)}
                            getOptionValue ={(option)=>option.cod_int}
                            />
                        }
                    </div>
                </div>
                <hr className="custom-hr"/>
                {/* Objetivos de aprendizagem */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Objetivos de aprendizagem
                        </Text>
                        <Input placeholder="Especifique os objetivos de aprendizagem (conhecimentos, aptidões e competências a desenvolver pelos estudantes)" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="Especifique os requisitos da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucRequisitos}
                            onChange={(e) => setRequisitos(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                {/* Conteúdos programáticos */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Conteúdos programáticos
                        </Text>
                        <Input placeholder="Especifique os conteúdos programáticos da UC" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="Demonstre a coerência dos conteúdos programáticos com os objectivos da unidade curricular" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucCoerenciaConteudos}
                            onChange={(e) => setCoerenciaConteudos(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                {/* Metodologias de ensino */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Metodologias de ensino
                        </Text>
                        <Input placeholder="Especifique as metodologias de ensino da UC" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="Demonstre a coerência das metodologias de ensino com os objectivos de aprendizagem da unidade" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucCoerenciaMetodologias}
                            onChange={(e) => setCoerenciaMetodologias(e.target.value)}
                        />
                    </div>
                </div>
                { /* Funcionamento da Componente Prática */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Funcionamento da Componente Prática*
                        </Text>
                        <Input placeholder="Indique o funcionamento da componente prática da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucFuncPratica}
                            onChange={(e) => setFuncPratica(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                
                { /* Aprendizagem ativa */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Aprendizagem ativa*
                        </Text>
                        <Input placeholder="Apresente as metodologias de ensino que promovam a aprendizagem ativa e a autonomia e fomentem a ligação entre investigação e ensino" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="Indique o(s) tipo(s) de avaliação da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucTipoAvaliacao}
                            onChange={(e) => setTipoAvaliacao(e.target.value)}
                        />
                    </div>
                </div>
                { /* Regime de Faltas */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Regime de Faltas*
                        </Text>
                        <Input placeholder="Indique o regime de faltas da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucRegFaltas}
                            onChange={(e) => setRegFaltas(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                { /* Bibliografia de consulta */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Bibliografia de consulta
                        </Text>
                        <Input placeholder="Indique a bibliografia principal/obrigatória (com pelo menos uma com data de edição igual ou superior a 2015)" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="URL de ficheiros extras úteis à UC" border="1px solid #424242" color="#424242"  
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
                        <Input placeholder="Indique informação relevante e variada sobre a UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={ucObservacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>
                </div>
            </form>
            }
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