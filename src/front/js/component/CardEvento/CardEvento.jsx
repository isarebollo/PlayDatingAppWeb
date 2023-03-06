import React, { useState } from "react";
import propTypes from "prop-types";
import "./CardEvento.css"
import "./../../../styles/index.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

import { retirarseDeEvento } from "./../api"
import { HOSTNAME } from "../config";
import moment from "moment";

export const CardEvento = (props) => {
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [textoModal, setTextoModal] = useState("");

  const onCancel = async () => {
    const response = await fetch(
      HOSTNAME + `/api/cancelarevento/${props.evento_id}`,
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
      <div className="container">

        <div className="col">
          <div className="card h-100 mb-4 text-center border rounded">
            <div className="card-footer">
              <small className="text-muted fs-5"> Creador: {props.creador} <br />{props.estado}</small>
            </div>

            <img src={props.src} className="card-img-top" alt={props.name} />
            <div className="card-body">
              <h5 className="card-title">{props.name}</h5>

              <p className="card-text">{date}</p>
            </div>
            <div>


              {props.creador ===
                parseInt(localStorage.getItem("usuario"), 10) ? (
                <div className="card-footer bg-body">
                  <Link to={props.route}>
                    <button
                      href="#"
                      className="button"
                      
                    >
                      Ver Detalles
                    </button>
                  </Link>
                  {props.estado !== "Cancelado" && props.estado !== "Cerrado" && (
                    <button
                      onClick={() => {
                        setModal1(true);
                        setTextoModal(
                          "¿Estás seguro de que quieres cancelar este evento?"
                        );
                      }}

                      href="#"
                      className="buttonRed m-3 "
                      role="button"
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
                  <div className="card-footer bg-body">
                    <Link to={props.route}>
                      <button
                     
                        href="#"
                        className="button"
                        
                      >
                        Ver Detalles
                      </button>
                    </Link>
                    {props.estado !== "Cancelado" &&
                      props.estado !== "Cerrado" && (
                        <button

                          className="buttonRed mt-2"
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
                  <div className="card-footer">
                    <Link to={props.route}>
                      <button

                        href="#"
                        className="button"
                        
                      >
                        Ver Detalles
                      </button>
                    </Link>
                  </div>
                </div>
              )}

            </div>


          </div>
        </div>

        <Modal show={modal1} onHide={() => setModal1(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Cancelar este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
              className="button mx-auto"
              variant="botonmodalazul"
              onClick={() => {
                onCancel();
               
              }}
            >
              Confirmar
            </Button>
            <Button
              className="buttonRed mx-auto"
              variant="botonmodalrojo"
              onClick={() => {
                setModal1(false);
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
          {/*--------------MODAL CONFIRMACION-----------------*/}
        </Modal>
        <Modal show={modal2} onHide={() => setModal2(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Detalles de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
              className="button mx-auto"
              variant="botonmodalazul"
              onClick={() => {
                window.location.reload(false);
              }}
            >
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
        {/*--------------MODAL RETIRO EVENTO----------------*/}
        <Modal show={modal3} onHide={() => setModal3(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Retirarme de este evento</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoModal}</Modal.Body>
          <Modal.Footer>
            <Button
              className="button mx-auto"
              variant="botonmodalazul"
              onClick={() => {
                onRetirarse();
              }}
            >
              Confirmar
            </Button>
            <Button
              className="buttonRed mx-auto"
              variant="botonmodalrojo"
              onClick={() => {
                setModal3(false);
              }}
            >
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>



      </div>

    </>
  );
};
CardEvento.propTypes = {
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




