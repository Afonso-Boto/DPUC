import { useState } from "react";
import { useHistory } from "react-router-dom";

import { ContentContainer, Input, Select, Text } from "@uaveiro/ui";



const CreateDPUC = () => {
    const [ucName, setName] = useState("Introdução à Programação");
    const [ucArea, setArea] = useState(-1);
    const areas = [
        {value: 1, label: "Informática"},
        {value: 2, label: "Matemática"},
        {value: 3, label: "Física"},
        {value: 4, label: "Psicologia"}
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



                    {ucName}
                    <br/>
                    {areas.filter(area => area.value === ucArea).length > 0 && areas.filter(area => area.value === ucArea)[0].label}
                </div>
            </form>
        </ContentContainer>
     );
}
 
export default CreateDPUC;