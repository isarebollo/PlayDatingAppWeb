import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext";


import ScrollToTop from "./component/scrollToTop";
import { Home } from "./pages/Home/Home.jsx";
import { Login } from "./component/Login/Login.jsx";
import { Registro } from "./component/Registro/Registro.jsx";
import { Navbar } from "./component/Navbar/Navbar.jsx";
import { Footer } from "./component/Footer/Footer.jsx";
import { Eventos } from "./pages/Eventos/Eventos.jsx";
import {Actividades} from "./pages/Actividades/Actividades.jsx"
import { MisEventos } from "./pages/Mis Eventos/MisEventos.jsx";
import { CrearEvento } from "./pages/Crear Evento/CrearEvento.jsx";
import { DetalleEvento } from "./pages/Detalle/DetalleEvento.jsx";
import { Miperfil } from "./pages/Mi Perfil/MiPerfil.jsx";
import { HomeCardGroup } from "./pages/HomeCardGroup/HomeCardGroup.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    return (
        <div id="container">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />

                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<HomeCardGroup />} path="/home" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Registro />} path="/registro" />
                        <Route element={<Eventos />} path="/eventos" />
                        <Route element={<MisEventos />} path="/misEventos" />
                        <Route element={<Actividades />} path="/actividades" />
                        <Route element={<CrearEvento />} path="/crearEvento/:actividadId" />
                        <Route element={<DetalleEvento />} path="/detalleEvento/:eventoId" />
                        <Route element={<Miperfil />} path="/miPerfil" />
                        <Route element={<h1>Not found!</h1>} />
                        
                    </Routes>

                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
