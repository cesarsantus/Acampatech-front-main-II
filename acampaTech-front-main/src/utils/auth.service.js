import axios from "axios";

const API_URL = "http://16.171.8.79:8080/api/auth/";

// const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, nome, nacionalidade, estadoCivil, escolaridade,
  dataNascimento, rg, orgaoExpeditor, cpf, endereco, bairro, cidade, estado, cep, acampamentosRealizados) => {
  const data = {
    username : username,
    email : email,
    password : password,
    role : ["user"],
    campista : {
      nome: nome,
      nacionalidade: nacionalidade,
      estadoCivil: estadoCivil,
      escolaridade: escolaridade,
      dataNascimento: dataNascimento,
      rg: rg,
      orgaoExpeditor: orgaoExpeditor,
      cpf:cpf,
      endereco:endereco,
      bairro:bairro,
      cidade:cidade,
      estado:estado, 
      cep:cep,
      acampamentosRealizados:acampamentosRealizados
    }
  }

  // console.log(data);

  return axios.post(API_URL + "signup", data );
};

const login = (username, password) => {

  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      // console.log(response.data)

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;