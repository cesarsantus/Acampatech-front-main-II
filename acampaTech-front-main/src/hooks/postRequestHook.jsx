import { useEffect, useState } from "react";
import { PostDataToApi } from "../utils/apiPost";

const FetchPost = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");
        setData(null);
        setError(null);

        PostDataToApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
                console.log(url)
                console.log(res)
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default FetchPost;