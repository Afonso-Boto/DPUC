import { Form } from "react-bootstrap";
import { useState } from "react";

const Input = (props) => {

    const [border, setBorder] = useState("1px solid black")

    return ( 
        <Form.Control 
        {...props}
        
        style={{borderRadius:"0px", boxShadow:"none", border:border, ...props.style}}
        onFocus={() => setBorder("2px solid black")}
        onBlur={() => setBorder("1px solid black")}
        />
     );
}
 
export default Input;