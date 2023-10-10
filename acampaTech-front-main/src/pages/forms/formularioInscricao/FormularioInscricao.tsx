import React, { ChangeEvent, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import PostDataToApi from "../../../utils/apiPost";
import { useNavigate } from "react-router-dom";
import userService from "../../../utils/user.service"
import AuthService from "../../../utils/auth.service"
import authHeader from "../../../utils/auth-header";

interface inscricao {
    campistaId: number
    acampamentoId: number
    equipePreferencia: string
    familiaresAcampamento: string
}

interface response {
    response: string | "No Response"
}

let initialState: inscricao = {
    campistaId: 1,
    acampamentoId: 1,
    equipePreferencia: "",
    familiaresAcampamento: ""
}

const FormularioInscricao = () => {
    const { acampamentoId, campistaId } = useParams()


    const [equipe, setEquipe] = useState('')
    const [familia, setFamilia] = useState('')

    const [inscricao, setInscricao] = useState<inscricao>(initialState)
    const [response, setResponse] = useState<response>()

    const [currentUser, setCurrentUser] = useState(undefined);

    const [campista, setCampista] = useState(undefined);
    const [inscrito, setInscrito] = useState(undefined);

    const navigate = useNavigate();

    const onChangeHandlerEquipe = (e: ChangeEvent<HTMLInputElement>) => {
        inscricao.equipePreferencia === "" ? setEquipe(e.target.value) : setEquipe(inscricao.equipePreferencia)
    }

    const onChangeHandlerFamilia = (e: ChangeEvent<HTMLInputElement>) => {
        inscricao.familiaresAcampamento === "" ? setFamilia(e.target.value) : setFamilia(inscricao.familiaresAcampamento)
    }

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        // console.log(user);
    
        if (user) {
          setCurrentUser(user);

          userService.getUserBoard(`/campista/${user.campistaId}`).then(
            (res) => {
                setCampista(res.data);
                // console.log(res.data)
            }
          )

          userService.getUserBoard(`/inscricao/campista/${user.campistaId}`).then(
            (res) => {
                setInscrito(res.data);
                // console.log(res.data)
            }
          )
          
        }

      }, []);


    const sumbitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        inscricao.acampamentoId = parseInt(acampamentoId!);
        inscricao.equipePreferencia = equipe === "" ? inscrito.equipePreferencia : equipe;
        inscricao.familiaresAcampamento = familia === "" ? inscrito.familiaresAcampamento : familia;
        inscricao.campistaId = currentUser.campistaId;
        
        if(inscrito?.id === undefined){
            // console.log(inscricao);

            await axios.post('http://16.171.8.79:8080/api/v1/inscricao', inscricao, { headers: authHeader() })
                .then((response) => {
                setResponse(response.data)
                // console.log(response.data)
                })
            .catch(function (error) {
            // console.log(error);
            });
        } 
        // else {
        //     console.log("USE PUT!!!");

        //     await axios.put<response>(`http://localhost:8080/api/v1/camp/inscricao/${inscrito.id}`, inscricao)
        //     .then((response) => {
        //     setResponse(response.data)
        //     console.log(response.data)
        //     })
        //     .catch(function (error) {
        //     console.log(error);
        //     });
        // }

        // alert("Voce se inscreveu com sucesso!!!")

        navigate(
            `/`
        )
      }

    return(
        <div className="formularioInscricao">
            {
            campista !== undefined ? (
            <React.Fragment>
                <ContentWrapper>
                    <form id="form" className="form" onSubmit={sumbitForm}>

                    <div className="form-control">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            readOnly
                            value={`${campista.nome}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="CPF">CPF</label>
                        <input
                            type="text"
                            id="CPF"
                            readOnly
                            value={`${campista.cpf}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="RG">RG</label>
                        <input
                            type="text"
                            id="RG"
                            readOnly
                            value={`${campista.rg}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="orgaoExpeditor">Orgao Expeditor</label>
                        <input
                            type="text"
                            id="orgaoExpeditor"
                            readOnly
                            value={`${campista.orgaoExpeditor}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Nacionalidade">Nacionalidade</label>
                        <input
                            type="text"
                            id="Nacionalidade"
                            readOnly
                            value={`${campista.nacionalidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="estadoCivil">Estado Civil</label>
                        <input
                            type="text"
                            id="estadoCivil"
                            readOnly
                            value={`${campista.nacionalidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="campista Nascimento">Data Nascimento</label>
                        <input
                            type="date"
                            id="Data Nascimento"
                            readOnly
                            value={`${campista.dataNascimento}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="endereco">endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            readOnly
                            value={`${campista.endereco}`}
                        />

                    </div>

                    <div className="form-control">
                        <label htmlFor="Bairro">Bairro</label>
                        <input
                            type="text"
                            id="Bairro"
                            readOnly
                            value={`${campista.bairro}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Cidade">Cidade</label>
                        <input
                            type="text"
                            id="Cidade"
                            readOnly
                            value={`${campista.cidade}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="Estado">Estado</label>
                        <input
                            type="text"
                            id="Estado"
                            readOnly
                            value={`${campista.estado}`}
                        />
                    </div>
                    <div className="form-control">
                        <label htmlFor="CEP">CEP</label>
                        <input
                            type="text"
                            id="CEP"
                            readOnly
                            value={`${campista?.cep}`}
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="equipe">Qual equipe gostaria de trabalhar?</label>
                        <input
                            type="text"
                            id="equipe"
                            placeholder="Digite a equipe que gostaria de trabalhar.."
                            onChange={onChangeHandlerEquipe}
                            value={
                                // @ts-ignore: Object is possibly 'null'.
                                inscrito.equipePreferencia
                            }
                        />
                    </div>

                    <div className="form-control">
                        <label htmlFor="email">Possui Familiares fazendo ou trabalhando no acampamento?</label>
                        <input type="text" id="email" placeholder="Digite o nome dos familiares.."
                        onChange={onChangeHandlerFamilia}
                        defaultValue={
                                // @ts-ignore: Object is possibly 'null'.
                                inscrito.familiaresAcampamento
                            }
                        />

                    </div>

                    <div className="bntSubmmit"
 
                        >
                        <button className="text" type="submit" >Enviar</button>
                    </div>
                </form>
            </ContentWrapper>
        </React.Fragment>
        ) : (
            <div></div>
            )
        }
        </div>
                        
    )

}

export default FormularioInscricao;