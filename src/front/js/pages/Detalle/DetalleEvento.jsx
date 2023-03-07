import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "./../../component/config";
import "./../../../styles/index.css";
import { ComentariosEvento } from "../../component/Comentarios/ComentarioEvento.jsx";
import { DetallesEventoCreado } from "../../component/Detalles/DetalleEventoCreado.jsx";
import { DetallesActividadEvento } from "../../component/Detalles/DetalleActividadesEvento.jsx";
import {
  agregarFavorito,
  obtenerFavoritos,
  eliminarFavorito,
  obtenerEventos,
} from "./../../component/api.js";

export const DetalleEvento = () => {
  const { eventoId } = useParams();
  const [favoritos, setFavoritos] = useState([]);
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/registro");
    } else {
      const fetchData = async () => {
        const response = await fetch(HOSTNAME + "/api/eventos", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const json = await response.json();
        const eventos = json.data;
        setEventos(eventos);
      };
      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const eventoEscojido = eventos.find((evento) => eventoId == evento.id);

  const participantesConFavoritos = (participantes) => {
    return participantes.map((participante) => {
      const esParticipanteFavorito =
        favoritos.find(
          (favorito) => favorito.usuario_favorito.id === participante.id
        ) !== undefined;
      return { ...participante, esFavorito: esParticipanteFavorito };
    });
  };

  const onAgregarFavorito = (usuarioFavoritoId) => {
    agregarFavorito(usuarioFavoritoId)
      .then((data) => {
        alert("usuario agregado a favoritos");
        setFavoritos([...favoritos, data.data]);
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  const onEliminarFavorito = (usuarioFavoritoId) => {
    eliminarFavorito(usuarioFavoritoId)
      .then((data) => {
        const newFavoritos = favoritos.filter(
          (favorito) => favorito.usuario_favorito.id !== usuarioFavoritoId
        );
        setFavoritos(newFavoritos);
        alert("usuario eliminado de favoritos");
      })
      .catch((error) => {
        const errorStr = JSON.stringify(error);
      });
  };

  const onAgregarOEliminarFavorito = (usuarioFavoritoId) => {
    if (
      favoritos.find(
        (favorito) => favorito.usuario_favorito.id === usuarioFavoritoId
      )
    ) {
      onEliminarFavorito(usuarioFavoritoId);
    } else {
      onAgregarFavorito(usuarioFavoritoId);
    }
  };

  return (
    <>
      <div className="container ">
        {eventoEscojido !== undefined && (
          <div className="mx-auto mt-3">
            <div className="text-center">
              <h1>Detalles del evento</h1>
            </div>
            <div>
              <div className="row row-cols-xs-3 mt-2 ">
                <div className="card-group ">
                  <DetallesActividadEvento
                    participantes={participantesConFavoritos(
                      eventoEscojido.participantes
                    )}
                    nombre={eventoEscojido.actividad.nombre}
                    creador={eventoEscojido.creador.nombre}
                    descripcion={eventoEscojido.actividad.descripcion}
                    imagen={eventoEscojido.actividad.imagen}
                    eventoId={eventoEscojido.id}
                    onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
                  />

                  <DetallesEventoCreado
                    eventoId={eventoEscojido.id}
                    lugar={eventoEscojido.direccion}
                    fecha_y_hora={eventoEscojido.fecha_y_hora}
                    direccion={eventoEscojido.direccion}
                    estado={eventoEscojido.estado}
                    tipo_de_actividad={
                      eventoEscojido.actividad.tipo_de_actividad
                    }
                    maximo_participantes={eventoEscojido.maximo_participantes}
                    cupos={eventoEscojido.cupos_disponibles}
                    edad_minima={eventoEscojido.edad_minima}
                    edad_maxima={eventoEscojido.edad_maxima}
                    participantes={eventoEscojido.participantes}
                  />
                </div>
              </div>
              {eventoEscojido.estado !== "Cancelado" && (
                <div>
                  <hr></hr>
                  <h3 className="text-center">Deja tu comentario aqui</h3>
                  <ComentariosEvento
                    eventoId={eventoEscojido.id}
                    favoritos={favoritos}
                    onAgregarOEliminarFavorito={onAgregarOEliminarFavorito}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {eventoEscojido === undefined && (
          <h2 className="m-4">...Cargando evento</h2>
        )}
      </div>
    </>
  );
};
