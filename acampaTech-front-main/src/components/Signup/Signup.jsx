import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../../utils/auth.service";

import "./style.scss";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const SignUp = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [nacionalidade, setNacionalidade] = useState("");
  const [estadoCivil, setEstadoCivil] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [rg, setRg] = useState("");
  const [orgaoExpeditor, setOrgaoExpeditor] = useState("");
  const [cpf, setCpf] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");
  const [acampamentosRealizados, setAcampamentosRealizados] = useState([])
  const [successful, setSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({});

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangeName = (e) => {
    const nome = e.target.value;
    setNome(nome);
  };

  const onChangeNacionalidade = (e) => {
    const nacionalidade = e.target.value;
    setNacionalidade(nacionalidade);
  };

  const onChangeEstadoCivil = (e) => {
    const estadoCivil = e.target.value;
    setEstadoCivil(estadoCivil);
  };

  const onChangeEscolaridade = (e) => {
    const escolaridade = e.target.value;
    setEscolaridade(escolaridade);
  };

  const onChangeDataNascimento = (e) => {
    const dataNascimento = e.target.value;
    setDataNascimento(dataNascimento);
  };

  const onChangeRg = (e) => {
    const rg = e.target.value;
    setRg(rg);
  };

  const onChangeOrgaoExpeditor = (e) => {
    const orgaoExpeditor = e.target.value;
    setOrgaoExpeditor(orgaoExpeditor);
  };

  const onChangeCpf = (e) => {
    const cpf = e.target.value;
    setCpf(cpf);
  };

  const onChangeEndereco = (e) => {
    const endereco = e.target.value;
    setEndereco(endereco);
  };

  const onChangeBairro = (e) => {
    const bairro = e.target.value;
    setBairro(bairro);
  };

  const onChangeCidade = (e) => {
    const cidade = e.target.value;
    setCidade(cidade);
  };

  const onChangeEstado = (e) => {
    const estado = e.target.value;
    setEstado(estado);
  };

  const onChangeCep = (e) => {
    const cep = e.target.value;
    setCep(cep);
  };

  const handleChangeCheckbox = (e) => {
    if (e.target.checked) {
       setAcampamentosRealizados([...acampamentosRealizados, e.target.value]);
    } else {
       setAcampamentosRealizados(acampamentosRealizados.filter((item) => item !== e.target.value));
    }

 }

 const validateValues = () => {
  let errors = {};

  if (username.length < 5) {
    errors.username = "O nome de usuário deve ser maior que 4 caractŕres";
  }

  let passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password);
  if (!passwordValidation){
    errors.password = "A senha deve conter pelo menos: "
    + "uma letra maiúscula\n"
    + "uma letra minúscula\n"
    + "um número\n"
    + "um caractér especial (!, @, #, $, %, ...) \n";
  }

  let emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

  if(!emailValidation){
    errors.email = "Email invalido";
  }

  if(nome.length <= 0){
    errors.nome = "Nome invalido"
  }

  if(nacionalidade.length <= 0){
    errors.nacionalidade = "nacionalidade invalida"
  }

  if(estadoCivil.length <= 0){
    errors.estadoCivil = "Estado civil invalido"
  }

  if(escolaridade.length <= 0){
    errors.escolaridade = "Selecione sua escolaridade"
  }


  setRg(rg.toUpperCase().replace(/\D/g,""))
  if(!(rg.length===8 || rg.length===9)){
    console.log("oii");
    errors.rg = "RG invalido";
  }

  if(orgaoExpeditor.length <= 0){
    errors.orgaoExpeditor = "Orgao expeditor invalido"
  }

  setCpf(cpf.toUpperCase().replace(/\D/g,""))
  if(cpf.length !== 11){
    errors.cpf = "CPF invalido"	
  } 

  if(endereco.length <= 0){
    errors.endereco = "endereco invalido"
  }

  if(bairro.length <= 0){
    errors.bairro = "bairro invalido"
  }

  if(cidade.length <= 0){
    errors.cidade = "cidade invalido"
  }

  if(estado.length <= 0){
    errors.estado = "estado invalido"
  }

  if(cep.length <= 0){
    errors.cep = "cep invalido"
  }

  return errors;
};

  const handleRegister = (e) => {
    e.preventDefault();

    setErrors(validateValues());

    if (Object.keys(errors).length === 0) {
      AuthService.register(username, email, password, nome, nacionalidade, estadoCivil, escolaridade,
        dataNascimento, rg, orgaoExpeditor, cpf, endereco, bairro, cidade, estado, cep, acampamentosRealizados).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          alert("Cadastro realizado com Sucesso!");
          navigate("/login");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-login-dark">
      <div className="div">
      <Form onSubmit={handleRegister} ref={form}>
        <div className="form">  
          <input className="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={onChangeUsername}
                        validations={[required]}
                        placeholder="Nome de Usuario">
          </input>
          {errors.username ? 
          (<p className="error">{errors.username}</p>) 
          : null}

          <input className="password"
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
            validations={[required]}
            placeholder="Senha">
          </input>
          {errors.password ? 
          (<p className="error">{errors.password}</p>) 
          : null}

          <input className="email"
                        type="text"
                        name="email"
                        value={email}
                        onChange={onChangeEmail}
                        validations={[required]}
                        placeholder="Email">
          </input>
          {errors.email ? 
          (<p className="error">{errors.email}</p>) 
          : null}

          <input className="nome"
                        type="text"
                        name="Nome Completo"
                        value={nome}
                        onChange={onChangeName}
                        validations={[required]}
                        placeholder="Nome Completo">
          </input>
          {errors.nome ? 
          (<p className="error">{errors.nome}</p>) 
          : null}

           <input className="nacionalidade"
                        type="text"
                        name="nacionalidade"
                        value={nacionalidade}
                        onChange={onChangeNacionalidade}
                        validations={[required]}
                        placeholder="Nacionalidade">
          </input>
          {errors.nacionalidade ? 
          (<p className="error">{errors.nacionalidade}</p>) 
          : null}

          <select name="estadoCivil" className="estadoCivil"
          value={estadoCivil} onChange={onChangeEstadoCivil}>
            <option value="">Selecione seu Estado civil</option>
            <option value="Solteiro (a)">Solteiro (a)</option>
            <option value="Casado (a)">Casado (a)</option>
            <option value="Divorciado (a)">Divorciado (a)</option>
            <option value="Viúvo (a)">Viúvo (a)</option>
          </select>
          {errors.estadoCivil ? 
          (<p className="error">{errors.estadoCivil}</p>) 
          : null}

          <select name="escolaridade" className="escolaridade"
          value={escolaridade} onChange={onChangeEscolaridade}>
            <option value="">Selecione sua escolaridade</option>
            <option value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</option>
            <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
            <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
            <option value="Ensino Médio Completo">Ensino Médio Completo</option>
            <option value="Ensino Superior Incompleto">Ensino Superior Incompleto</option>
            <option value="Ensino Superior Completo">Ensino Superior Completo</option>
            <option value="Mestre">Mestre</option>
            <option value="Doutor">Doutor</option>
          </select>
          {errors.escolaridade ? 
          (<p className="error">{errors.escolaridade}</p>) 
          : null}



          <input className="dataNascimento"
                        type="date"
                        name="dataNascimento"
                        value={dataNascimento}
                        onChange={onChangeDataNascimento}
                        validations={[required]}
                        placeholder="Data de nascimento">
          </input>
          {errors.dataNascimento ? 
          (<p className="error">{errors.dataNascimento}</p>) 
          : null}

          <input className="rg"
                        type="text"
                        name="rg"
                        value={rg}
                        onChange={onChangeRg}
                        validations={[required]}
                        placeholder="RG">
          </input>
          {errors.rg ? 
          (<p className="error">{errors.rg}</p>) 
          : null}

          <input className="orgaoExpeditor"
                        type="text"
                        name="orgaoExpeditor"
                        value={orgaoExpeditor}
                        onChange={onChangeOrgaoExpeditor}
                        validations={[required]}
                        placeholder="Orgão Expeditor">
          </input>
          {errors.orgaoExpeditor ? 
          (<p className="error">{errors.orgaoExpeditor}</p>) 
          : null}

          <input className="cpf"
                        type="text"
                        name="cpf"
                        value={cpf}
                        onChange={onChangeCpf}
                        validations={[required]}
                        placeholder="CPF">
          </input>
          {errors.cpf ? 
          (<p className="error">{errors.cpf}</p>) 
          : null}

          <input className="endereco"
                        type="text"
                        name="endereco"
                        value={endereco}
                        onChange={onChangeEndereco}
                        validations={[required]}
                        placeholder="Endereço">
          </input>
          {errors.endereco ? 
          (<p className="error">{errors.endereco}</p>) 
          : null}

          <input className="bairro"
                        type="text"
                        name="bairro"
                        value={bairro}
                        onChange={onChangeBairro}
                        validations={[required]}
                        placeholder="Bairro">
          </input>
          {errors.bairro ? 
          (<p className="error">{errors.bairro}</p>) 
          : null}

          <input className="cidade"
                        type="text"
                        name="cidade"
                        value={cidade}
                        onChange={onChangeCidade}
                        validations={[required]}
                        placeholder="Cidade">
          </input>
          {errors.cidade ? 
          (<p className="error">{errors.cidade}</p>) 
          : null}

          <input className="estado"
                        type="text"
                        name="estado"
                        value={estado}
                        onChange={onChangeEstado}
                        validations={[required]}
                        placeholder="Estado">
          </input>
          {errors.estado ? 
          (<p className="error">{errors.estado}</p>) 
          : null}

          <input className="cep"
                        type="text"
                        name="cep"
                        value={cep}
                        onChange={onChangeCep}
                        validations={[required]}
                        placeholder="CEP">
          </input>
          {errors.cep ? 
          (<p className="error">{errors.cep}</p>) 
          : null}

          <h3 className="h3CheckBox" >Marque quais acampamentos você já fez:</h3>

          <div className="AcampamentoJuvenil">
            <input value = "Acampamento Juvenil" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Juvenil </span>
          </div>

          <div className="AcampamentoCasais">
            <input value = "Acampamento de Casais" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento de Casais </span>
          </div>

          <div className="AcampamentoJoam">
            <input value = "Acampamento Joam" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Joam </span>
          </div>

          <div className="AcampamentoFac">
            <input value = "Acampamento FAC" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento FAC </span>
          </div>

          <div className="AcampamentoCes">
            <input value = "Acampamento CES" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento CES </span>
          </div>

          <div className="AcampamentoMirim">
            <input value = "Acampamento Mirim" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Mirim </span>
          </div>

          <div className="AcampamentoMaanaim">
            <input value = "Acampamento Maanaim" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento Maanaim </span>
          </div>

          <div className="AcampamentoMulheres">
            <input value = "Acampamento Muheres" type = "checkbox" onChange = {handleChangeCheckbox} />
            <span> Acampamento de Muheres </span>
          </div>

          <button className="login-btn" >login</button>

        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    ); 
};

export default SignUp;