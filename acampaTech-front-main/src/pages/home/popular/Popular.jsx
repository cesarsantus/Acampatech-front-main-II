import React, { useState } from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/acampamento/proximosAcampamentos`);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Acampamentos nos próximos 6 meses</span>
            </ContentWrapper>
            <Carousel
                data={data}
                loading={loading}
                endpoint={endpoint}
            />
        </div>
    );
};

export default Popular;
