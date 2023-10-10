import axios from "axios";
import authHeader from "./auth-header";

const BASE_URL = "http://16.171.8.79:8080/api/v1";
// const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

// const headers = {
//     Authorization: "bearer " + TMDB_TOKEN,
// };

export const fetchDataFromApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url);
        return data;
    } catch (err) {
        // console.log(err);
        return err;
    }
};
