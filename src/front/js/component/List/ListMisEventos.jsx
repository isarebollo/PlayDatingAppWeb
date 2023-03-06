import React, { useState } from "react";
import propTypes from "prop-types";
import { HOSTNAME } from "./../../component/config";
import { retirarseDeEvento } from "../api";
import "./../List/ListMisEventos.css";
import "./../../../styles/index.css";
import { Link } from "react-router-dom";

import moment from "moment";

export const ListMisEventos = (props) => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [textoModal, setTextoModal] = useState("");

  const onCancel = async () => {
    const response = await fetch(
      HOSTNAME + `/cancelarevento/${props.evento_id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
      }
    );
    const json = await response.json();
    setTextoModal("Se ha cancelado este evento.");
    setModal1(false);
    setModal2(true);
  };
  const onRetirarse = () => {
    retirarseDeEvento(props.evento_id)
      .then((data) => {
        setModal1(false);
        setTextoModal(
          "Se ha retirado la participación del usuario a este evento."
        );
        setModal2(true);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
        setTextoModal(error.message);
        setModal2(true);
      });
  };

  let date = moment(props.fecha_y_hora).format("DD/MM/YYYY - HH:mm");

  return (
    <>
      <div className="list-group">
        <div
          className=" text-center list-group-item mb-4 list-group-item-action border rounded"
          aria-current="true"
        >
          <div className="row row-cols-1 row-cols-md-3 align-items-center">
            <img
              className="imgListMisEventos"
              src={props.src}
              alt={props.name}
            />
            <h4>{props.name}</h4>
            <p className=" date">{date}</p>
          </div>
          <div className="row row-cols-1 row-cols-md-3 align-items-center">
            <p>Max participantes: {props.max_participantes}</p>
            <p>Plazas disponibles: {props.cupos_disponibles}</p>
            {props.estado === "Cancelado" || props.estado === "Cerrado" ? (
              <p className="text-danger">{props.estado}</p>
            ) : (
              <p className="text-success">{props.estado}</p>
            )}
          </div>

          {props.creador == parseInt(localStorage.getItem("usuario"), 10) ? (
            <div className="footer">
              <Link to={props.route}>
                <button className="button">Ver Detalles</button>
              </Link>
              {props.estado !== "Cancelado" && props.estado !== "Cerrado" && (
                <button
                  onClick={() => {
                    setModal1(true);
                    setTextoModal(
                      "¿Estás seguro de que quieres cancelar este evento?"
                    );
                  }}
                  className="buttonRed m-3"
                >
                  Cancelar Evento
                </button>
              )}
            </div>
          ) : undefined !==
            props.participantes.find(
              (participante) =>
                participante.id === localStorage.getItem("usuario")
            ) ? (
            <div>
              <div className="footer bg-body">
                <Link to={props.route}>
                  <button className="btn">Ver Detalles</button>
                </Link>
                {props.estado !== "Cancelado" && props.estado !== "Cerrado" && (
                  <button
                    className="btn m-1"
                    onClick={() => {
                      setModal3(true);
                      setTextoModal(
                        "¿Estás seguro de que quieres retirar tu participación de este evento?"
                      );
                    }}
                  >
                    Retirarse
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div>
              <div className="bg-body">
                <Link to={props.route}>
                  <button href="#" className="button" role="button">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
ListMisEventos.propTypes = {
  evento_id: propTypes.number,
  creador: propTypes.number,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
  max_participantes: propTypes.number,
  min_participantes: propTypes.number,
  estado: propTypes.string,
  fecha_y_hora: propTypes.string,
};
