import React from "react";
import { useParams } from "react-router-dom";
import FormularioInscricao from "./formularioInscricao/FormularioInscricao";


const Forms = () => {
    const { id } = useParams();

    return (
        <div>
            {
            <FormularioInscricao />
            }
        </div>
    );

}

export default Forms;