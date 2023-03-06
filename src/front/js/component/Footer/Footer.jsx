import React from "react";

import "./../../../styles/index.css";
import "./../Footer/Footer.css";

import { BsGithub, BsLinkedin } from "react-icons/bs";

export const Footer = () => {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="row info-Foote">
            <div className="about col-sm-12 col-md-6">
              <h6>About</h6>
              <p className="text-justify">
                <i>PLAYDATING </i> Es una Web App de eventos infantiles <br />
                Esta construida con diferentes lenguajes de programación,
                frameworks y librerias como ReactJS, HTML, CSS, Bootstrap,
                JavaScript, Python, Flask, SqlAlchemy, Cloudinary, Jwt{" "}
              </p>
            </div>

            <div className=" Links col-xs-6 col-md-3">
              <h6>Categorias</h6>
              <ul className="footer-links">
                {" "}
                {/*cambiar links  */}
                <li>
                  <a
                    target="_blank"
                    href="https://developer.mozilla.org/es/docs/Web/JavaScript/"
                  >
                    JavaScript
                  </a>{" "}
                  {" -- "}
                  <a target="_blank" href="https://es.reactjs.org/">
                    ReactJS
                  </a>
                </li>
                <li>
                  <a target="_blank" href="https://www.python.org/doc/">
                    Python
                  </a>{" "}
                  {" -- "}
                  <a
                    target="_blank"
                    href="https://flask.palletsprojects.com/en/2.2.x/"
                  >
                    Flask
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://getbootstrap.com/docs/5.0/getting-started/introduction/"
                  >
                    Bootstrap
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://cloudinary.com/?&utm_campaign=1329&utm_content=instapagelogocta-selfservetest/"
                  >
                    Cloudinary
                  </a>
                </li>
              </ul>
            </div>

            <div className="Links col-xs-6 col-md-3">
              <h6>Quick Links</h6>
              <ul className="footer-links">
                <li>
                  <a target="_blank" href="/home">
                    Home
                  </a>
                </li>
                <li>
                  <a target="_blank" href="miPerfil">
                    Mi Perfil
                  </a>
                </li>
                <li>
                  <a target="_blank" href="/actividades">
                    Actividades
                  </a>
                </li>
                {/* <li><a target={"_blank"} href="">ContactUS</a></li>
                <li><a target={"_blank"} href="">Sitemap</a></li> */}
              </ul>
            </div>
          </div>
          <hr></hr>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright &copy; 2023 All Rights Reserved by{" "}
                <a>Isabel Rebollo Corraliza</a>.
              </p>
            </div>
            {/* ..........................................añadir links ............................ */}
            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a
                    className="github"
                    target="_blank"
                    href="https://github.com/isarebollo/Proyect-PlayDating/"
                  >
                    <BsGithub></BsGithub>
                  </a>
                </li>
                <li>
                  <a
                    className="linkedin"
                    target="_blank"
                    href="https://www.linkedin.com/in/isabelrebollo/"
                  >
                    <BsLinkedin></BsLinkedin>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
