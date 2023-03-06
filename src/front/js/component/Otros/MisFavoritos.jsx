import React, { useState, useEffect } from "react";

import "./../../../styles/index.css";
import { obtenerFavoritos, eliminarFavorito } from "./../api.js";
import { FaTrash } from "react-icons/fa";
import { BsFillStarFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

export const MisFavoritos = () => {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    obtenerFavoritos()
      .then((data) => {
        setFavoritos(data.data);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  }, []);

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        setFavoritos(
          favoritos.filter(
            (favorito) => favorito.usuario_favorito.id !== usuarioFavoritoId
          )
        );
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  return (
    <>
      <div className="container mx-auto ">
        <div className="card border">
          <div className="card-header">
            <h5 className="text-center">
              Mis Favoritos
              <i className="text-warning ms-3">
                <BsFillStarFill></BsFillStarFill>
              </i>
            </h5>
          </div>
          <ul className="list-group list-group-flush">
            {favoritos.length === 0 && (
              <li key={0} className="list-group-item">
                Tu lista de favoritos está vacía.
              </li>
            )}

            {favoritos.map((favorito, index) => {
              return (
                <li className="list-group-item m-1" key={index}>
                  <GoPrimitiveDot></GoPrimitiveDot>{" "}
                  {favorito.usuario_favorito.nombre.toUpperCase()}{" "}
                  <button
                    className="buttonRed ms-4"
                    onClick={() => {
                      onEliminarFavorito(favorito.usuario_favorito.id);
                    }}
                  >
                    <FaTrash></FaTrash>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
