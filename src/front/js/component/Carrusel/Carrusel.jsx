import React, { useEffect, useState } from "react";

import { HOSTNAME } from "../config.js";

import Carousel from "react-bootstrap/Carousel";
import "./../Carrusel/Carrusel.css";
import "./../../../styles/index.css";

export const Carrusel = () => {
  const [actividades, setActividades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(HOSTNAME + "/api/actividades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      });
      const json = await response.json();
      setActividades(json.data);
    };

    fetchData().catch((error) => {
      console.log(error);
    });
  }, []);
  return (
    <>
      <Carousel touch={true} variant="dark">
        {actividades.map((actividad) => (
          <Carousel.Item key={actividad.id}>
            <img
              className=" imagenCarrusel mx-auto d-block w-50 "
              src={actividad.imagen}
              alt="Actividad"
            />
            <Carousel.Caption>
              <h2>{actividad.nombre}</h2>
              <p>{actividad.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <div>
        <a className="nav-link" href="/registro">
          <button className="button  mx-auto mb-4" id="buttonCarrusel">
            REGISTRATE PARA MAS INFORMACION
          </button>
        </a>
      </div>
    </>
  );
};
