import React from "react";
import { Link } from "react-router-dom";
import "./../../../styles/index.css";
import PlayDating from "./../../../img/logo-bloques.png";

export const NavbarSinLogin = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <img id="logo" src={PlayDating} alt="PlayDating" />
        <div className="container-fluid">
          <a className="navbar-brand " href="/">
            PlayDating
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
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <form className="ms-auto">
              <Link to="/login">
                <button className="button btn-outline-dark me-2">Login</button>
              </Link>
              <Link to="/registro">
                <button className="button btn-outline-dark me-2">
                  Registro
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
