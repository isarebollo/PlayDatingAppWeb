import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOSTNAME } from "./../../component/config";

import "./../../../styles/index.css";
import { ListMisEventos } from "../../component/List/ListMisEventos.jsx";
import { AiOutlineAlert } from "react-icons/ai";

export const MisEventos = () => {
  const [eventos, setEventos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/");
    } else {
      const fetchData = async () => {
        const response = await fetch(HOSTNAME + "/api/eventoscreados/usuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const response1 = await fetch(HOSTNAME + "/api/eventos/usuario", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.token}`,
          },
        });

        const json = await response.json();
        const json1 = await response1.json();
        const eventos = json.data.concat(json1.data);
        setEventos(eventos);
      };
      fetchData().catch((error) => {
        console.log(error);
      });
    }
  }, []);

  const esEventoFuturo = (fecha) => {
    const tiempoTrans = Date.now();
    const fechaActual = new Date(tiempoTrans);
    const fechaEvento = new Date(fecha);
    return fechaActual < fechaEvento;
  };

  const definirEstado = (evento) => {
    let estado = evento.estado;
    if (!esEventoFuturo(evento.fecha_y_hora)) {
      estado = "Cerrado";
    }
    return estado;
  };

  const sortedArray = (eventos) => {
    eventos.sort((a, b) => {
      const fechaEventoA = new Date(a.fecha_y_hora);
      const fechaEventoB = new Date(b.fecha_y_hora);
      if (fechaEventoA < fechaEventoB) {
        return 1;
      } else if (fechaEventoB < fechaEventoA) {
        return -1;
      } else {
        return 0;
      }
    });
    return eventos;
  };

  return (
    <>
      <div className="container">
        <div className="text-center p-3 ">
          <h3 className="text-center ">Mis Eventos</h3>
        </div>
        {eventos.length === 0 && (
          <div className="m-5 NoHayEventos">
            <h2 className="iconAlerta">
              <AiOutlineAlert />
            </h2>
            <h4>No tienes Eventos</h4>
          </div>
        )}
        <div>
          {sortedArray(eventos).map((evento, index) => {
            return (
              <div key={index}>
                <ListMisEventos
                  evento_id={evento.id}
                  creador={evento.creador.id}
                  participantes={evento.participantes}
                  name={evento.actividad.nombre}
                  src={evento.actividad.imagen}
                  text={evento.actividad.descripcion}
                  tipo={evento.actividad.tipo_de_actividad}
                  cupos_disponibles={evento.cupos_disponibles}
                  max_participantes={evento.maximo_participantes}
                  estado={definirEstado(evento)}
                  fecha_y_hora={evento.fecha_y_hora}
                  route={"/detalleEvento/" + evento.id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
