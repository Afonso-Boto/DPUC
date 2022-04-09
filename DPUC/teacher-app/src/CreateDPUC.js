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
        {value: 2, label: "Doutoramento (3º ciclo)"}
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
            <form onSubmit={handleSubmit}>
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Nome da Unidade Curricular
                        </Text>
                        <Input 
                            placeholder="Nome da UC..." 
                            border="1px solid #424242" 
                            color="#424242"
                            required
                            value={ucName}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Área Científica
                        </Text>
                        <Select 
                            variant="black" 
                            placeholder="Selecione a área da UC..."
                            options={areas}
                            onChange={(e) => setArea(e.value)}
                        />
                    </div>
                </div>
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Unidade(s) Orgânica(s)
                        </Text>
                        <Select 
                            isMulti
                            variant="black" 
                            placeholder="Indique a(s) Unidade(s) Orgânica(s) a que a UC está alocada..."
                            options={unidadesOrganicas}
                            onChange={(e) => setUO(Array.from(
                                    e,
                                    (v => v.value)
                                ))
                            }
                        />
                    </div>
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Curso(s) de lecionação
                        </Text>
                        <Select 
                            isMulti
                            variant="black" 
                            placeholder="Selecione o(s) curso(s) de lecionação da UC..."
                            options={cursos}
                            onChange={(e) => setCurso(Array.from(
                                e,
                                (v => v.value)
                            ))
                        }
                        />
                    </div>
                </div>
                <div className="row" style={{paddingTop: "10px"}}>
                    <div className="col-lg-1">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            ECTS
                        </Text>
                        <Input 
                            border="1px solid #424242" 
                            color="#424242"
                            required
                            type="number"
                            min={4}
                            max={30}
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
                        <Select 
                            variant="black" 
                            placeholder="Duração da UC"
                            options={duracoes}
                            onChange={(e) => setDuracao(e.value)}
                        />
                    </div>
                    {
                        <div className="col-lg-2" style={{visibility: ucDuracao == 1 ? 'visible' : 'hidden' }}>
                            <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                                Semestre
                            </Text>
                            <Select 
                                variant="black" 
                                placeholder="Semestre da UC"
                                options={semestre}
                                onChange={(e) => setSemestre(e.value)}
                            />
                        </div>
                    }
                    <div className="col-lg-6">
                        <Text as="h3" size="large" color="#0EB4BD" fontWeight="400">
                            Grau do Ciclo de estudos
                        </Text>
                        <Select 
                            variant="black" 
                            placeholder="Selecione o ciclo de estudos da UC"
                            options={graus}
                            onChange={(e) => setGrau(e.value)}
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
Nome do docente responsável
Outros docentes

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