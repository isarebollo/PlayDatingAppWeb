import React, { useState, useEffect, useContext } from "react";

import { obtenerInvitaciones, eliminarInvitacion } from "./../api.js";
import { Context } from "./../../store/appContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { GoPrimitiveDot } from "react-icons/go";

import "./../../../styles/index.css";

export const MisInvitaciones = () => {
  const { store, actions } = useContext(Context);
  const [invitaciones, setInvitaciones] = useState([]);

  useEffect(() => {
    obtenerInvitaciones()
      .then((data) => {
        setInvitaciones(data.data);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

  const onEliminarInvitacion = (invitacionId) => {
    eliminarInvitacion(invitacionId)
      .then((data) => {
        setInvitaciones(
          invitaciones.filter((invitacion) => invitacion.id !== invitacionId)
        );
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="card mb-4 border ">
          <div className="card-header">
            <h5 className="text-center">Mis Invitaciones</h5>
          </div>
          <ul className="list-group list-group-flush">
            {invitaciones.length === 0 && (
              <li key={0} className="list-group-item">
                No tienes invitaciones.
              </li>
            )}

            {invitaciones.map((invitacion, index) => {
              return (
                <li className="list-group-item m-1" key={index}>
                  <div>
                    <GoPrimitiveDot></GoPrimitiveDot>
                    {invitacion.usuario_creador.nombre +
                      " " +
                      "te ha invitado a " +
                      invitacion.evento.actividad.nombre}{" "}
                  </div>
                  <div className="row">
                    <div className="col-10">
                      <Link to={"/detalleEvento/" + invitacion.evento.id}>
                        <button
                          className="btn btn-outline-info ms-1"
                          onClick={() => {}}
                        >
                          {" "}
                          Ver Evento
                        </button>
                      </Link>
                    </div>
                    <div className="col-2">
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => {
                          onEliminarInvitacion(invitacion.id);
                        }}
                      >
                        <FaTrash></FaTrash>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
