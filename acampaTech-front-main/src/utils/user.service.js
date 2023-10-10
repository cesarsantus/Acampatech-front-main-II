import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://16.171.8.79:8080/api/v1";

// const API_URL = "http://localhost:8080/api/v1";

const getPublicContent = () => {
    return axios.get(API_URL);
  };
  
  const getUserBoard = async (path) => {

    // console.log(authHeader());

    return await axios.get(API_URL + path, { headers: authHeader() });
  };
  const UserService = {
    getPublicContent,
    getUserBoard
  };
  
  export default UserService;