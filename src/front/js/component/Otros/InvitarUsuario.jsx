import React, { useState, useEffect } from "react";
import { obtenerFavoritos } from "./../api.js";
import "./../../../styles/index.css";

export const InvitarUsuario = (props) => {
  const [favoritos, setFavoritos] = useState([]);
  const [invitacion, setInvitacion] = useState([]);

  useEffect(() => {
    obtenerFavoritos()
      .then((data) => {
        setFavoritos(data.data);
      })
      .catch((error) => {
        JSON.stringify(error);
      });
  }, []);

  const llenarOpcionesSelect = () => {
    const favoritosUsuario = favoritos;
    if (favoritosUsuario.length !== 0) {
      let opcionesSelect = favoritosUsuario.map((favoritoUsuario, index) => {
        return (
          <option key={index} value={favoritoUsuario.usuario_favorito.id}>
            {favoritoUsuario.usuario_favorito.nombre}
          </option>
        );
      });
      return opcionesSelect;
    } else {
      return <option>No tienes favoritos</option>;
    }
  };

  const updateSelect = (e) => {
    const value = e.target.value;
    setInvitacion(value);
    
    props.onRecibirUsuarioAInvitar(value);
  };

  return (
    <>
      <div className="mb-2 mx-auto">
        <label className="col-form-label">Invita a tus amigos favoritos</label>

        <select
          onChange={(e) => updateSelect(e, setInvitacion)}
          value={invitacion}
          className="form-select"
          multiple={false}
        >
          <option value="Seleccionar">Seleccionar</option>
          {llenarOpcionesSelect()}
        </select>
      </div>
    </>
  );
};
