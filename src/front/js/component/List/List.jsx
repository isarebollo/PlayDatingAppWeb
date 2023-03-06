import React from "react";
import propTypes from "prop-types";

import "./../../../styles/index.css";
import { Link } from "react-router-dom";

export const List = (props) => {
  return (
    <>
      <div className="list-group ">
        <div
          className=" text-center list-group-item m-3 list-group-item-action border rounded"
          aria-current="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <img src={props.src} alt="" />
            <h4 className="mb-1 mt-4 ">{props.name}</h4>
            <small>{props.tipo}</small>
          </div>
          <div>
            <p className="mb-1">{props.descripcion}</p>
          </div>
          <div className="text-center">
            <Link to={`/${props.route}`}>
              <button type="button" className="button btn-lg">
                {props.button}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
List.propTypes = {
  clase: propTypes.string,
  name: propTypes.string,
  src: propTypes.string,
  text: propTypes.string,
  tipo: propTypes.string,
  route: propTypes.string,
};
