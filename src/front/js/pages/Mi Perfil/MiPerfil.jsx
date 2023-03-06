import React, { useState } from "react";
import "./../../../styles/index.css"
import "./../Mi Perfil/MiPerfil.css"
import { MisFavoritos } from "./../../component/Otros/MisFavoritos.jsx";
import { Perfil } from "./../../component/Perfil/Perfil.jsx"
import { MisInvitaciones } from "./../../component/Otros/MisInvitaciones.jsx";

export const Miperfil = () => {
  const [nombre, setNombre] = useState("");

  const notificarNombreUsuario = (nombre) => {
    setNombre(nombre);
  };
  return (
    <>

      <div className="container mb-5 ">
        <div className="mt-4 pt-3 text-center ">
          <h2 >¡Hola {nombre}!</h2>
        </div>
        <div className="row justify-content-center ">

          <Perfil notificarNombre={notificarNombreUsuario} />
        </div>

        <div className="d-flex flex-row justify-content-center">
          <div className="p-2 "><MisFavoritos /></div>
          <div className="p-2 "><MisInvitaciones /></div>
        </div>
      </div>
    </>
  );
};
