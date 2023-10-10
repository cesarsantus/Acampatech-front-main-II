import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import "./style.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import {FaCampground} from "react-icons/fa";
import userService from "../../../utils/user.service"
import AuthService from "../../../utils/auth.service"

const DetailsBanner = () => {
    const { id } = useParams();
    const { data, loading } = useFetch(`/acampamento/${id}`);
    const [pode, setPode] = useState('')
    const [currentUser, setCurrentUser] = useState(undefined);
    const [podeTrabalhar, setpodeTrabalhar] = useState({ hits: [] });
    
    
    const navigate = useNavigate();

    

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
          userService.getUserBoard(`/acampamento/campista/${user.campistaId}/acampamento/${id}/permission`).then(
            (res) => {
                setpodeTrabalhar(res.data);
            }
          )
          
        }
      }, []);
    

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    



    return (
        
        <div className="detailsBanner">
            {
            !loading ? (
                
                <>
                    {
                    !!data && (
                        <React.Fragment>
                            <div className="backdrop-img">
                                <Img src={"src/assets/Acampamento JOAM.jpeg"} />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {data ? (
                                            <Img
                                                className="posterImg"
                                                src={`${
                                                    "src/assets/" + data.nome + ".jpeg"
                                                }`}
                                            />
                                        ) : (
                                            <Img
                                                className="posterImg"
                                                src={PosterFallback}
                                            />
                                        )}
                                    </div>
                                     <div className="right">
                                        <div className="title">
                                            {`${
                                                data.nome 
                                            }`}
                                        </div>
                                        <div className="subtitle">
                                            {data.tema}
                                        </div>
                                        
                                        
                                        {
                                        data.inscricoesAbertas ? (
                                            currentUser.username === undefined ? (
                                                
                                                <div className="playbtn"
                                                onClick={() => {navigate(`/login`)}}
                                            >
                                                <button className="text">
                                                    <FaCampground />
                                                        Clique aqui para fazer seu Login
                                                </button>
                                                </div>
                                            )
                                            : (
                                            podeTrabalhar ? (
                                            <div className="playbtn"
                                                    onClick={() => {navigate(`/inscricao/${id}/${currentUser.id}`)}}
                                                >
                                                    <button className="text">
                                                    <FaCampground />
                                                        Inscreva-se para trabalhar
                                                    </button>
                                            </div>) : (
                                                <div
                                                className="playbtn"
                                                >
                                                    <button className="text">
                                                    <FaCampground />
                                                        Inscreva-se para fazer o acampamento
                                                    </button>
                                            </div>

                                            )
                                            )
                                        ) : (
                                            <div className="warning">
                                                As incrições para o acampamento logo estarão abertas!
                                            </div>
                                        )
                                        
                                        }
                                    
                                        <div className="overview">
                                            <div className="description">
                                                {data.tema}
                                            </div>
                                        </div>
                                        


                                        <div className="info">
                                            {data.tema && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Status:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {data.tema}
                                                    </span>
                                                </div>
                                            )}

                                            {
                                            data && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Data Inicio:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.dataInicio
                                                        ).format("DD/MM/YYYY")}
                                                    </span>

                                                    <span className="text bold">
                                                        Data Fim:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(
                                                            data.dataFim
                                                        ).format("DD/MM/YYYY")}
                                                    </span>
                                                </div>
                                                
                                            )}

                                            {data.data_inicio && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Runtime:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(
                                                            data.data_inicio
                                                        )}
                                                    </span>
                                                </div> 
                                            )}
                                        </div>
                                    
                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Fotos:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link fotos</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }

                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Playlist:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link playlist</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }

                                        {data.data_fim < Date.now() && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Playlist:{" "}
                                                </span>
                                                <span className="text">
                                                    {data.map((d, i) => (
                                                            <a>link playlist</a>
                                                    ))}
                                                </span>
                                            </div>
                                        )
                                        }
                                            
                                        </div>
                                    </div>
                            </ContentWrapper>
                        </React.Fragment>
                    )
                    }
                 </>)
             : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )
        }
        </div>
    );
};

export default DetailsBanner;
