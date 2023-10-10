import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/ASPEL.jpeg";
import useFetch from "../../hooks/useFetch";
import userService from "../../utils/user.service"
import AuthService from "../../utils/auth.service"
import EventBus from "../../common/EventBus";


const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setData] = useState({ hits: [] });
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
          userService.getUserBoard(`/campista/${user.campistaId}`).then(
            (res) => {
                setData(res.data);
                // console.log(res.data);
            }
          )
        }

        EventBus.on("logout", () => {
            logOut();
          });
      
          return () => {
            EventBus.remove("logout");
          };
      }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);


    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        navigate(`/${type}`)
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                {
                    data.nome != undefined ? (
                        <ul className="menuItems">
                            <li
                                className="menuItem"
                                onClick={() => navigationHandler("minhasInscricoes")}
                            >
                                Minhas Inscrições
                            </li>
                            <li
                                className="menuItem"
                                // onClick={() => navigationHandler("tv")}
                            >
                                {data.nome.split(" ")[0]}
                            </li>
                        </ul>
                    ) : (
                        <ul className="menuItems">
                        <li
                            className="menuItem"
                            onClick={() => navigationHandler("signup")}
                        >
                            Registrar
                        </li>
                        <li
                            className="menuItem"
                            onClick={() => navigationHandler("login")}
                        >
                            Logar
                        </li>
                    </ul>
                    )
                }

            </ContentWrapper>
        </header>
    );
};

export default Header;
