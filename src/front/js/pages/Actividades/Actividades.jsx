import React, { useEffect, useState, useContext } from "react";
import { obtenerActividades } from "./../../component/api";
import { Context } from "../../store/appContext";
import { List } from "../../component/List/List.jsx";
import "./../Actividades/Actividades.css"
import "./../../../styles/index.css"

export const Actividades = () => {

    const { store, actions } = useContext(Context);
    const [actividadesCards, setActividadesCards] = useState([]);




    
    useEffect(() => {
        obtenerActividades().then((data) => {
            const actividades = data.data;
            actions.agregarActividades(actividades);
            let cardsActividades = actividades.map((actividad, index) => {
               
                return (
                    <div key={index}>
                        <List
                            // homeCard={false}
                            // forzarHeight={true}
                           
                            name={actividad.nombre}
                            src={actividad.imagen}
                            tipo={actividad.tipo_de_actividad}
                            descripcion={actividad.descripcion}
                            button=" Crear Evento "
                            route={"crearEvento/" + actividad.id}
                        ></List>
                    </div>
                );
            });
            setActividadesCards(cardsActividades);
        });
    }, []);



    return (

        <>
            <div className="container">
                <h2 className="text-center ">ACTIVIDADES</h2>
                <div>
                    {actividadesCards}

                </div>


            </div>
        </>
    )



}