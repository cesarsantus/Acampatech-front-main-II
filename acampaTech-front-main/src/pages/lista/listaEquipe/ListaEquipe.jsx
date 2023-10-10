import React, {useState} from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";

import {FaCampground} from "react-icons/fa";

import "./style.scss";

const ListaEquipe = () => {
    const { data, loading } = useFetch(`/campista/acampamento/1352`);
    const { data: inscricoes, loading: loadingIncricoes } = useFetch(`/inscricao`);
    // const [equipe, setEquipe] = useState()
    var equipe;


    return (
        <div className="listaDeIncricoes">
            <ContentWrapper>
                <div className="listaAcampamento">
                    <ul >
                        Inscritos para trabalhar:

                    </ul>
                </div>
            <table>
                <tbody>
            <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Equipe Selecionada</th>
                <th>Equipe Escolhida</th>
            </tr>
            
            { !loading && !loadingIncricoes ? (
            data?.map((item, index) =>{
                return(
                    <tr key={item.id}>
                        <td ><a href={`/campista/${item.id}`} >{item.nome}</a></td>
                        <td>{item.dataNascimento}</td>
                        {
                            inscricoes.forEach((inscricao) => {
                            // console.log(inscricao.campistaId === 1 ? "true" : "false")
                                if(inscricao.campistaId === 1){
                            //         console.log("entrou")
                                    equipe = inscricao.equipePreferencia;
                            //     }
            }})
                        }
                        <td>{equipe}</td>
                        <td>
                            <select name="equipes">
                                <option value="Anjos">Anjos</option>
                                <option value="Externa">Externa</option>
                                <option value="Cozinha">Cozinha</option>
                                <option value="Manutencao">Manutencao</option>
                            </select>
                        </td>

                    </tr>
                )
            })
            ) : (
                <div></div>
            )}
            </tbody>
            </table>
            </ContentWrapper>
        </div>
    );
}

export default ListaEquipe;