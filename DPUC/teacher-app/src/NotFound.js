import { Link } from "react-router-dom";
import { Error } from "@paco_ua/pacoui";

const NotFound = () => {
    return ( 
        <div className="not-found" style={{"text-align":"center"}}>
            <Error text="A página que está a tentar aceder não existe."/>
            
            <Link to="/">Voltar à página inicial.</Link>
        </div>
     );
}
 
export default NotFound;