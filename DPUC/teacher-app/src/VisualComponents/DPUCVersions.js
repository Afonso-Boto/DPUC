import Selector from "./Selector";
import useFetch from "../Helper/useFetch";
import { useEffect } from "react"

const DPUCVersions = ({uc}) => {

    var URL_VERSIONS = "http://localhost:82/edition/getAllDpucs?id=" + uc;

    const {data: versions, loading, error} = useFetch(URL_VERSIONS);

    useEffect(() => {
        console.log(versions);
    }, [versions]);
    useEffect(() => {
        console.log(loading);
    }, [loading]);
    useEffect(() => {
        console.log(error);
    }, [error]);
    
    return ( 
        <Selector
            placeholder="Outras versões"
            noOptionsMessage="Não foram encontradas outras versões"
        />
     );
}
 
export default DPUCVersions;