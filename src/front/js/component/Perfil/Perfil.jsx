import React, { useEffect, useState, useContext } from "react";
import "./../Perfil/Perfil.css";
import "./../../../styles/index.css";
import { HOSTNAME, config } from "../config.js";
import FormularioHijos from "../Otros/FormularioHijos.jsx";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export const Perfil = (props) => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [numero_hijos, setNumero_hijos] = useState(1);
  const [provincia, setProvincia] = useState("");
  const [datos, obtenerDatos] = useState({});

  const [textoAlerta, setTextoAlerta] = useState("");
  const [navegar, setNavegar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const modalManager = (texto, canNavigate) => {
    setTextoAlerta(texto);
    setNavegar(canNavigate);
    handleShow();
  };

  useEffect(() => {
    const token = localStorage.getItem(config.jwt.nameToken);
    if (!token) {
      navigate("/");
    }
    fetch(HOSTNAME + "/api/perfil", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        obtenerDatos(data.data);
        setNumero_hijos(data.data.numero_hijos);
        setProvincia(data.data.provincia);
        props.notificarNombre(data.data.nombre);
      })
      .catch((e) => {
        console.error(e);
        navigate(`/`);
      });
  }, []);

  const updateText = (e, setState) => {
    const value = e.target.value;

    setState(value);
  };
  const onSave = async (e) => {
    const token = localStorage.getItem(config.jwt.nameToken);
    const body = JSON.stringify({
      numero_hijos,
      provincia,
    });
    const res = await fetch(HOSTNAME + "/api/perfil/modificar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    });
    const json = await res.json();
    const data = json.data;

    obtenerDatos({
      ...datos,
      provincia: data.provincia,
      numero_hijos: data.numero_hijos,
    });
    if (res.status == 200) {
      modalManager(json.message, true);
    } else if (res.status !== 200) {
      modalManager(json.message, false);
    }
  };
  return (
    <>
      <div className="container  m-5 perfil border rounded ">
        <div className="row">
          <div className="col-md-6 my-3">
            <label className="form-label">Nombre Completo: </label>
            <span>
              <strong> {datos.nombre}</strong>
            </span>
          </div>
          <div className="col-md-6 my-3">
            <label className="form-label">Email: </label>
            <span>
              <strong> {datos.email}</strong>
            </span>
          </div>
          <div className="col-md-6">
            <label className="form-label">Nombre de tus hij@s</label>
            <div>
              <FormularioHijos />
            </div>
          </div>

          <div className="col-md-6">
            <label className="form-label">??Cu??ntos hijos tienes? </label>
            <div className="input-group mb-3">
              <input
                onChange={(e) => updateText(e, setNumero_hijos)}
                defaultValue={datos.numero_hijos}
                type="number"
                className="form-control"
              ></input>
            </div>
          </div>

          <div className="col-md-4">
            <label className="form-label">Provincia</label>
            <select
              onChange={(e) => updateText(e, setProvincia)}
              className="form-select"
            >
              <option defaultValue={datos.provincia}>{datos.provincia}</option>
              <option value="??lava">??lava</option>
              <option value="Albacete">Albacete</option>
              <option value="Alicante">Alicante</option>
              <option value="Almer??a">Almer??a</option>
              <option value="Asturias">Asturias</option>
              <option value="??vila">??vila</option>
              <option value="Badajoz">Badajoz</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Burgos">Burgos</option>
              <option value="C??ceres">C??ceres</option>
              <option value="C??diz">C??diz</option>
              <option value="Cantabria">Cantabria</option>
              <option value="Castell??n">Castell??n</option>
              <option value="Ciudad Real">Ciudad Real</option>
              <option value="C??rdoba">C??rdoba</option>
              <option value="A Coru??a">A Coru??a</option>
              <option value="Cuenca">Cuenca</option>
              <option value="Girona">Girona</option>
              <option value="Granada">Granada</option>
              <option value="Guadalajara">Guadalajara</option>
              <option value="Gipuzkoa">Gipuzkoa</option>
              <option value="Huelva">Huelva</option>
              <option value="Huesca">Huesca</option>
              <option value="Illes Balears">Illes Balears</option>
              <option value="Ja??n">Ja??n</option>
              <option value="Le??n">Le??n</option>
              <option value="Lleida<">Lleida</option>
              <option value="Lugo">Lugo</option>
              <option value="Madrid">Madrid</option>
              <option value="M??laga">M??laga</option>
              <option value="Murcia">Murcia</option>
              <option value="Navarra">Navarra</option>
              <option value="Ourense">Ourense</option>
              <option value="Palencia">Palencia</option>
              <option value="Las Palmas">Las Palmas</option>
              <option value="Pontevedra">Pontevedra</option>
              <option value="La Rioja">La Rioja</option>
              <option value="Segovia">Segovia</option>
              <option value="Sevilla">Sevilla</option>
              <option value="Soria">Soria</option>
              <option value="Tarragona">Tarragona</option>
              <option value="Santa Cruz de Tenerife">
                {" "}
                Santa Cruz de Tenerife{" "}
              </option>
              <option value="Teruel">Teruel</option>
              <option value="Toledo">Toledo</option>
              <option value="Valencia">Valencia</option>
              <option value="Valladolid">Valladolid</option>
              <option value="Bizkaia">Bizkaia</option>
              <option value="Zamora">Zamora</option>
              <option value="Zaragoza">Zaragoza</option>
            </select>
          </div>
          {/* -------------------------------------------------------------------------- */}
          <div className="col-12 mb-4 text-center">
            <button onClick={onSave} type="submit" className="button">
              Guardar datos
            </button>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Mi Perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              className="button mx-auto"
              variant="botonmodalazul"
              onClick={() => {
                if (navegar) {
                  window.location.reload();
                } else {
                  handleClose();
                }
              }}
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};
