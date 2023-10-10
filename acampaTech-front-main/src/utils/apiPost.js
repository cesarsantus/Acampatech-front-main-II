import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/camp";


const PostDataToApi = async (url, Postdata) => {

    try {
        const { data } = await axios.post(BASE_URL + url, Postdata);
        return data;
    } catch (err) {
        // console.log(err);
        return err;
    }
};

export default PostDataToApi;