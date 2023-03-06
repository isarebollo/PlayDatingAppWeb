import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOSTNAME } from "./../../component/config";

import "./../../../styles/index.css";
import { ListMisEventos } from "../../component/List/ListMisEventos.jsx";

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
        <h2 className="text-center ">MIS EVENTOS</h2>
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
    </>
  );
};
