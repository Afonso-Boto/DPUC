import Selector from "./Selector";
import useFetch from "../Helper/useFetch";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const DPUCVersions = ({uc, id}) => {

    const navigate = useNavigate();

    var URL_VERSIONS = process.env.REACT_APP_FETCHER + "edition/getAllDpucs?id=" + uc;

    const {data: versions, loading, error} = useFetch(URL_VERSIONS);

    const [versionList, setVersionList] = useState([]);

    const [selectedVersion, setVersion] = useState(null);
    /*
    useEffect(() => {
        if(versions){
            versions.sort((a,b) => a.id < b.id ? 1 : -1)
            for(let i = 0; i < versions.length; i++){
                versions[i].versao = versions.length - i;
            }
            setVersion(versions.find((v) => v.id === id));
            setVersionList(versions);
        }
    }, [versions]);
    */
    useEffect(() => {
        if(versions){
            versions.sort((a,b) => a.id < b.id ? 1 : -1)
            for(let i = 0; i < versions.length; i++){
                const baseYear = parseInt(versions[i].data_alteracao.substring(0,4));
                versions[i].versao = baseYear + "/" + (baseYear+1);
            }
            setVersion(versions.find((v) => v.id === id));
            setVersionList(versions);
        }
    }, [versions]);

    return ( 
        <Selector
            placeholder="Outras versões"
            noOptionsMessage="Não foram encontradas outras versões"
            value={selectedVersion}
            options={versionList}
            isClearable={false}
            onChange={(e) => navigate("/dpuc/" + e.id)}
            //getOptionLabel ={(option)=>"Edição " + option.versao + " [" + (option.data_alteracao ? option.data_alteracao : " ") + "]"}
            getOptionLabel ={(option)=>"Edição de " + option.versao}
            getOptionValue ={(option)=>option.id}
        />
     );
}
 
export default DPUCVersions;