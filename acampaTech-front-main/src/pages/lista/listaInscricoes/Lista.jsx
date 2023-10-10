import React, { useState, useEffect } from "react";
import axios from "axios";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

import {FaCampground} from "react-icons/fa";
import AuthService from "../../../utils/auth.service"
import userService from "../../../utils/user.service"

import "./style.scss";

const Lista = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [campista, setCampista] = useState(undefined);
    const [inscricoes, setinscricoes] = useState(undefined);

    // const { data, loading } = useFetch(`/acampamento/campista/1352`);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        // console.log(user);
    
        if (user) {
          setCurrentUser(user);

          userService.getUserBoard(`/acampamento/campista/${user.campistaId}`).then(
            (res) => {
                setinscricoes(res.data);
                // console.log(res.data)
            }
          )

          userService.getUserBoard(`/campista/${user.campistaId}`).then(
            (res) => {
                setCampista(res.data);
                // console.log(res.data)
            }
          )
          
        }

      }, []);

    function sumbitForm(id) {    
        axios.delete(`http://localhost:8080/api/v1/camp/inscricao/acampamento/${id}`)
        .then((response) => {
        // console.log(response.data)
        })
        .catch(function (error) {
        // console.log(error);
        });
      }

    return (
        <div className="listaDeIncricoes">
            <ContentWrapper>
                { 
                <div className="listaAcampamento">
                    <ul >
                        Suas inscrições
                        {

                            inscricoes?.map((item) =>{
                                return(
                                    <li className="item" key={item.id}>
                                        {item.nome}
                                        <a className="editar" href={`/inscricao/${item.id}/${campista.id}`}>Editar</a>
                                        <a className="excluir" onClick={() => sumbitForm(item.id)}>Excluir</a>
                                    </li>
                                    
                                )
                            })
                        }
                    </ul>
                </div>
}
            </ContentWrapper>
        </div>
    );
}

export default Lista;