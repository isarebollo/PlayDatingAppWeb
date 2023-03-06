import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import "./../../../styles/index.css";
export const Card = (props) => {
  const clase = props.forzarHeight
    ? "card text-center h-50 "
    : "card text-center m-3 border rounded";

  const cardId = props.homeCard ? "cardHome" : "cardActividades";

  const imagenId = props.home ? "homeCardImagen" : "imgCarrusel";

  return (
    <>
      <div className={clase} id={cardId}>
        <img
          className="card-img-top img-fluid rounded"
          id={imagenId}
          src={props.src}
          alt="Card imagen"
        ></img>
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          {props.text && (
            <>
              <p className="card-text text-center">{props.text}</p>
              <p className="card-text">{props.tipo}</p>
            </>
          )}
        </div>
        {props.button && (
          <div className="m-2 ">
            <Link to={`/${props.route}`}>
              <button href="#" id="buttonCard" className="button btn-outline">
                {props.button}
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
Card.propTypes = {
  clase: propTypes.string,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
};
