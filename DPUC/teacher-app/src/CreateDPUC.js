import { useState } from "react";
import { useHistory } from "react-router-dom";

import { ContentContainer, Input, Select, Text } from "@uaveiro/ui";



const CreateDPUC = () => {
    const [ucName, setName] = useState("Introdução à Programação");
    const [ucArea, setArea] = useState(-1);
    const [ucUO, setUO] = useState([]);
    const [ucCurso, setCurso] = useState([]);
    const [ucECTS, setECTS] = useState(6);
    const [ucDuracao, setDuracao] = useState(-1);
    const [ucSemestre, setSemestre] = useState(-1);
    const [ucGrau, setGrau] = useState(-1);
    const [ucHorasTP, setHorasTP] = useState(0);
    const [ucHorasT, setHorasT] = useState(0);
    const [ucHorasP, setHorasP] = useState(0);
    const [ucHorasOT, setHorasOT] = useState(0);
    const [ucIdioma, setIdioma] = useState([]);
    const [ucRegente, setRegente] = useState();
    const [ucDocentes, setDocentes] = useState([]);


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


    return ( 
        <ContentContainer padding="40px" >
            <div className="row">
                <div className="col-lg">
                    <Text as="h1" size="xxxLarge" fontWeight="400"> 
                        Criar UC e Dossier Pedagógico
                    </Text>
                    <hr/>
                </div>
            </div>
            Nota para devs: Campos assinalados com * são opcionais
            <form onSubmit={handleSubmit}>
                {/* Nome e Área da UC */}
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Input placeholder="Nome da UC..." border="1px solid #424242" color="#424242" required 
                            value={ucName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Área Científica
                        </Text>
                        <Select placeholder="Selecione a área da UC..." variant="black" 
                            options={areas}
                            onChange={(e) => setArea(e.value)}
                        />
                    </div>
                </div>
                {/* Unidade(s) Orgânica e Curso(s) de lecionacionação */}
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade(s) Orgânica(s)
                        </Text>
                        <Select isMulti placeholder="Indique a(s) Unidade(s) Orgânica(s) a que a UC está alocada..." variant="black" 
                            options={unidadesOrganicas}
                            onChange={(e) => setUO(Array.from(e, (v => v.value)))}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Curso(s) de lecionação
                        </Text>
                        <Select isMulti placeholder="Selecione o(s) curso(s) de lecionação da UC..." variant="black" 
                            options={cursos}
                            onChange={(e) => setCurso(Array.from(e, (v => v.value)))}
                        />
                    </div>
                </div>
                {/* ECTS, Duração, Semestre e Grau do Ciclo de Estudos */}
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-1">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Input border="1px solid #424242" color="#424242" required type="number"
                            min={4} max={30}
                            value={ucECTS}
                            onChange={(e) => setECTS(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-1">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Horas
                        </Text>
                        <Text size="large" color="#424242" fontWeight="300">
                            {ucECTS*27}
                        </Text>
                    </div>
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
                        <div className="col-lg-2" style={{visibility: ucDuracao == 1 ? 'visible' : 'hidden' }}>
                            <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                                Semestre*
                            </Text>
                            <Select placeholder="Semestre da UC" variant="black" 
                                options={semestre}
                                onChange={(e) => setSemestre(e.value)}
                            />
                        </div>
                    }
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
                {/* Carga Letiva Semanal */}
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Carga Letiva Semanal (em Horas)
                        </Text>
                        <div className="row" style={{paddingTop: "10px"}}>
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
                            Idioma(s) de lecionação
                        </Text>
                        <Select isMulti placeholder="Selecione o(s) idioma(s) de lecionação da UC..." variant="black" 
                            options={idiomas}
                            onChange={(e) => setIdioma(Array.from(e, (v => v.value)))}
                        />
                    </div>
                </div>
                {/* Docente Responsável / Regente */}
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-12">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Docente Responsável (Regente)
                        </Text>
                        <Select placeholder="Selecione o docente responsável pela UC..." variant="black" 
                            options={docentes}
                            onChange={(e) => setRegente(e.value)}
                        />
                    </div>
                </div>
                {/* Docente Responsável / Regente */}
                <div className="row" style={{paddingTop: "10px"}}>
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
Carga horária do docentes responsável
Carga horária dos docentes

Horas de contacto

Línguas de Lecionação
Página Pública?


Objetivos de aprendizagem (conhecimentos, aptidões e competências a desenvolver pelos estudantes)
Pré-requisitos (no dpuc = requisitos)


Conteúdos programáticos
Demonstração da coerência dos conteúdos programáticos com os objectivos da unidade curricular.
Metodologias de ensino (avaliação incluída)
Demonstração da coerência das metodologias de ensino com os objectivos de aprendizagem da unidade
Regime de Faltas?
Modalidade de Lecionação
Funcionamento da Componente Prática?
Aprendizagem ativa ?
Tipo de avaliação ?
Bibliografia de consulta / Existência obrigatória (dpuc = bibliografia principal)
Ficheiros?
Observações

=== Automático === 
Código Interno?
Data da última alteração?
*/
export default CreateDPUC;