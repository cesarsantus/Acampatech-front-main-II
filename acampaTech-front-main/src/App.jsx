import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { fetchDataFromApi } from "./utils/api";

import { useSelector, useDispatch } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Forms from "./pages/forms/Forms";
import PageNotFound from "./pages/404/PageNotFound";
import Lista from "./pages/lista/listaInscricoes/Lista";
import ListaEquipe from "./pages/lista/listaEquipe/ListaEquipe";
import Login from "./components/Login/Login";
import SignUp from "./components/Signup/Signup";
import AuthService from "./utils/auth.service";



function App() {
    const dispatch = useDispatch();
    const { url } = useSelector((state) => state.home);
    // console.log(url);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        // fetchApiConfig();
        // genresCall();
    }, []);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
    
        if (user) {
          setCurrentUser(user);
        //   setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
        //   setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
      }, []);


    const genresCall = async () => {
        let promises = [];
        let endPoints = ["tv", "movie"];
        let allGenres = {};

        endPoints.forEach((url) => {
            promises.push(fetchDataFromApi(`/genre/${url}/list`));
        });

        const data = await Promise.all(promises);
        data.map(({ genres }) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (

        <BrowserRouter>
            <Header />  
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path=":id" element={<Details />} />
                <Route path="inscricao/:acampamentoId/:campistaId" element={<Forms />} />
                <Route path="minhasInscricoes" element={<Lista />} />
                <Route path="minhaEquipe" element={<ListaEquipe />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            {/* <Footer /> */}
        </BrowserRouter>
    );
}

export default App;
