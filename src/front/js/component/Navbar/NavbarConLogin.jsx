import React from "react";
import { Link } from "react-router-dom";
import { config } from "./../config";
import "./../../../styles/index.css";
import "./Navbar.css";
import PlayDating from "./../../../img/logo-bloques.png";

export const NavbarConLogin = () => {
  const removeStorage = () => {
    localStorage.removeItem(config.jwt.nameToken);
    localStorage.removeItem("usuario");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand nav-link" href="/">
            <img id="logo" src={PlayDating} alt="PlayDating" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse">
            <div className="navbar-nav ">
              <a className="nav-link" href="/home">
                Home
              </a>
              <a className="nav-link" href="/actividades">
                Actividades
              </a>
              <a className="nav-link" href="/eventos">
                Eventos
              </a>
              <a className="nav-link" href="/misEventos">
                Mis eventos
              </a>
              <a className="nav-link" href="/miPerfil">
                MiPerfil
              </a>
            </div>
          </div>
          <form>
            <Link to="/">
              <button
                className="button me-2  "
                onClick={() => {
                  removeStorage();
                  window.location.reload();
                }}
              >
                Salir
              </button>
            </Link>
          </form>
        </div>
      </nav>
    </>
  );
};
