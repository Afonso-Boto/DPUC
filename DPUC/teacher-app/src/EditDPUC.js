import { useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col } from 'react-bootstrap';
import { ContentContainer, Input, Select, Text, Button, AnimatedBackground, SelectLoading } from "@uaveiro/ui";
import useFetch from "./useFetch";
import axios from "axios";
import useGetDPUC from "./Helper/useGetDPUC";
import getFormattedDPUC from "./Helper/getFormattedDPUC";
import { EntitiesContext } from "./Helper/Context";



const EditDPUC = () => {

    const { id } = useParams();

    const URL_DPUC = "http://localhost:8000/dpuc/" + id;

    const navigate = useNavigate();
    
    const { data, loading: loadDPUC, error: errorDPUC } = useFetch(URL_DPUC);
    
    const { retryFetch, setRetry, uos, cursos, graus, areas, idiomas, duracoes, semestre, modalidades, docentes } = useContext(EntitiesContext);

    const { parsing: loadParse, error: errorParse, dpuc, dpucSet} = useGetDPUC(data);
    const [errorPUT, setErrorPUT] = useState(false);
    const [loadingPUT, setLoadingPUT] = useState(false);
    
    const dataDpuc = new Date();

    const handleSubmit = (e) => {
        e.preventDefault();

        setErrorPUT(false);
        setLoadingPUT(true);

        axios
            .put(URL_DPUC, getFormattedDPUC(dpuc, "Em Edição"))
            .then(() => {
                navigate("/");
            })
            .catch((error) => {
                setErrorPUT(true);
            })
            .finally( () => {
                setLoadingPUT(false);
            });
            
    }
    const handleBack = () => {
        navigate("/");
    }
    const reloadEntities = () => {
        setRetry(retryFetch + 1);
    }

    if(dpuc)
        console.log(dpuc);

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
            { (!uos || !cursos || !graus || !areas || !idiomas || !duracoes || !semestre || !modalidades || !docentes) &&
                !loadDPUC && !loadParse && !dpuc &&
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Text as="i" size="large" color="red"> Não foi carregar o formulário de edição de DPUC. </Text>
                        <br/>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" onClick={reloadEntities} style={{fontSize:"100%"}}>Recarregar</Button>
                    </Col>
                </Row>
            }
            { errorPUT &&
                    <Text as="i" size="medium" color="red"> Não foi possível guardar o DPUC. Por favor tente novamente mais tarde. </Text>
            }
            { (loadDPUC || loadParse) && <AnimatedBackground height="100px" width="50%"></AnimatedBackground> }
            { errorDPUC && <Text as="i" size="large" color="red"> Não foi possível obter detalhes sobre este DPUC. </Text> }
            { dpuc && !loadDPUC && !loadParse &&
            <form onSubmit={handleSubmit}>
                <Row style={{paddingTop:"10px"}}>
                    <Col>
                        <Button variant="default" onClick={handleBack} style={{fontSize:"100%"}}>Voltar</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" style={{fontSize:"100%"}}>
                            { loadingPUT ? "A Guardar DPUC..." : "Guardar"}
                        </Button>
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
                        { dpuc.unidadeOrganica &&
                            <Text as="h4" size="medium" fontWeight="400">
                                {dpuc.unidadeOrganica.nome}
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
                        { dpuc.responsavel &&
                            <Text as="h4" size="medium" fontWeight="400">
                                {dpuc.responsavel.nome_completo}
                            </Text>
                        }
                    </Col>
                    <Col lg={"auto"}>
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Text as="h4" size="medium" fontWeight="400">
                            {dpuc.ects}
                        </Text>
                    </Col>
                </Row>
                <hr className="custom-hr"/>
                <Row>
                    <Col>
                        <Text as="span" size="medium" color="#0EB4BD" fontWeight="400">Última alteração: </Text>
                        { dpuc.dataAlteracao &&
                            <Text as="span" size="medium">{dpuc.dataAlteracao.toLocaleDateString()}</Text>
                        }
                    </Col>
                    <Col>
                        <Text as="i" size="medium">Campos assinalados com * são obrigatórios</Text>
                    </Col>
                </Row>
                {/* Curso(s) de lecionacionação e Grau do Ciclo de Estudos*/}
                <div className="row row-pad">
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Curso(s) de lecionação*
                        </Text>
                        { cursos &&
                            <Select isMulti placeholder="Selecione o(s) curso(s) de lecionação da UC..." variant="black" 
                                options={cursos}
                                value={dpuc.cursos}
                                onChange={(e) => dpucSet.setCurso(Array.from(e, (v => v)))}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Grau do Ciclo de estudos*
                        </Text>
                        { graus && 
                            <Select placeholder="Selecione o ciclo de estudos da UC" variant="black" 
                                options={graus}
                                value={dpuc.grau}
                                onChange={(e) => dpucSet.setGrau(e)}
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
                            Área Científica*
                        </Text>
                        { areas && 
                            <Select placeholder="Selecione a área da UC..." variant="black" 
                                options={areas}
                                value={dpuc.areaCientifica}
                                onChange={(e) => dpucSet.setAreaCientifica(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>(option.sigla)}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Idioma(s) de lecionação*
                        </Text>
                        { idiomas && 
                            <Select isMulti placeholder="Selecione o(s) idioma(s) de lecionação da UC..." variant="black" 
                                options={idiomas}
                                value={dpuc.linguas}
                                onChange={(e) => dpucSet.setLinguas(Array.from(e, (v => v)))}
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
                            Carga Letiva Semanal (em Horas)*
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
                                            value={dpuc.horasTP}
                                            onChange={(e) => dpucSet.setHorasTP(e.target.value)}
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
                                        value={dpuc.horasT}
                                        onChange={(e) => dpucSet.setHorasT(e.target.value)}
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
                                        value={dpuc.horasP}
                                        onChange={(e) => dpucSet.setHorasP(e.target.value)}
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
                                        value={dpuc.horasOT}
                                        onChange={(e) => dpucSet.setHorasOT(e.target.value)}
                                        style={{width:"50px"}}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </div>
                    <div className="col-lg-3">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Duração*
                        </Text>
                        { duracoes && dpuc.duracao &&
                            <Select placeholder="Duração da UC" variant="black" 
                                options={duracoes}
                                value={dpuc.duracao}
                                onChange={(e) => dpucSet.setDuracao(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    { dpuc.duracao && dpuc.duracao.nome === "Semestral" &&
                        <div className="col-lg-3">
                            <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                                Semestre
                            </Text>
                            { semestre &&
                                <Select placeholder="Semestre da UC" variant="black" 
                                    options={semestre}
                                    value={dpuc.periodo}
                                    onChange={(e) => dpucSet.setPeriodo(e)}
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
                            Modalidade de Lecionação*
                        </Text>
                        { modalidades &&
                            <Select placeholder="Selecione a modalidade de lecionação da UC" variant="black" 
                                options={modalidades}
                                value={dpuc.modalidade}
                                onChange={(e) => dpucSet.setModalidade(e)}
                                getOptionLabel ={(option)=>(option.nome)}
                                getOptionValue ={(option)=>option.id}
                            />
                        }
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Página Pública da UC
                        </Text>
                        <Input placeholder="Insira o URL da página da UC..." border="1px solid #424242" color="#424242" 
                            value={dpuc.paginaPublica}
                            onChange={(e) => dpucSet.setPaginaPublica(e.target.value)}
                        />
                    </div>
                </div>
                {/* Docentes da UC */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docentes Associados à UC*
                        </Text>
                        { docentes &&
                            <Select isMulti placeholder="Selecione docentes associados à UC..." variant="black"
                            options={docentes}
                            value={dpuc.docentes}
                            onChange={(e) => dpucSet.setDocentes(Array.from(e, (v => v)))}
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
                            Objetivos de aprendizagem*
                        </Text>
                        <Input placeholder="Especifique os objetivos de aprendizagem (conhecimentos, aptidões e competências a desenvolver pelos estudantes)" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.objetivos}
                            onChange={(e) => dpucSet.setObjetivos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Pré-requisitos */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Pré-requisitos da UC*
                        </Text>
                        <Input placeholder="Especifique os requisitos da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.requisitos}
                            onChange={(e) => dpucSet.setRequisitos(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                {/* Conteúdos programáticos */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Conteúdos programáticos*
                        </Text>
                        <Input placeholder="Especifique os conteúdos programáticos da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.conteudos}
                            onChange={(e) => dpucSet.setConteudos(e.target.value)}
                        />
                    </div>
                </div>
                {/* Demonstração da coerência dos conteúdos programáticos com os objectivos da unidade curricular. */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Coerência dos Conteúdos programáticos*
                        </Text>
                        <Input placeholder="Demonstre a coerência dos conteúdos programáticos com os objectivos da unidade curricular" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.coerenciaConteudos}
                            onChange={(e) => dpucSet.setCoerenciaConteudos(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                {/* Metodologias de ensino */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Metodologias de ensino*
                        </Text>
                        <Input placeholder="Especifique as metodologias de ensino da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.metodologias}
                            onChange={(e) => dpucSet.setMetodologias(e.target.value)}
                        />
                    </div>
                </div>
                {/* Demonstração da coerência das metodologias de ensino com os objectivos de aprendizagem da unidade */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Coerência dos Conteúdos programáticos*
                        </Text>
                        <Input placeholder="Demonstre a coerência das metodologias de ensino com os objectivos de aprendizagem da unidade" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.coerenciaMetodologias}
                            onChange={(e) => dpucSet.setCoerenciaMetodologias(e.target.value)}
                        />
                    </div>
                </div>
                { /* Funcionamento da Componente Prática */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Funcionamento da Componente Prática
                        </Text>
                        <Input placeholder="Indique o funcionamento da componente prática da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.funcionamento}
                            onChange={(e) => dpucSet.setFuncionamento(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                
                { /* Aprendizagem ativa */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Aprendizagem ativa
                        </Text>
                        <Input placeholder="Apresente as metodologias de ensino que promovam a aprendizagem ativa e a autonomia e fomentem a ligação entre investigação e ensino" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.aprendizagem}
                            onChange={(e) => dpucSet.setAprendizagem(e.target.value)}
                        />
                    </div>
                </div>
                { /* Tipo de avaliação */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Tipo de avaliação*
                        </Text>
                        <Input placeholder="Indique o(s) tipo(s) de avaliação da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.avaliacao}
                            onChange={(e) => dpuc.setAvaliacao(e.target.value)}
                        />
                    </div>
                </div>
                { /* Regime de Faltas */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Regime de Faltas
                        </Text>
                        <Input placeholder="Indique o regime de faltas da UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.regimeFaltas}
                            onChange={(e) => dpucSet.setRegimeFaltas(e.target.value)}
                        />
                    </div>
                </div>
                <hr className="custom-hr"/>
                { /* Bibliografia de consulta */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Bibliografia de consulta*
                        </Text>
                        <Input placeholder="Indique a bibliografia principal/obrigatória (com pelo menos uma com data de edição igual ou superior a 2015)" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.bibliografia}
                            onChange={(e) => dpucSet.setBibliografia(e.target.value)}
                        />
                    </div>
                </div>
                { /* Ficheiros */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Ficheiros
                        </Text>
                        <Input placeholder="URL de ficheiros extras úteis à UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.ficheiros}
                            onChange={(e) => dpucSet.setFicheiros(e.target.value)}
                        />
                    </div>
                </div>
                { /* Observações */}
                <div className="row row-pad">
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                        Observações*
                        </Text>
                        <Input placeholder="Indique informação relevante e variada sobre a UC" border="1px solid #424242" color="#424242"  
                            as="textarea" fontSize="120%" className="textarea-custom"
                            value={dpuc.observacoes}
                            onChange={(e) => dpucSet.setObservacoes(e.target.value)}
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