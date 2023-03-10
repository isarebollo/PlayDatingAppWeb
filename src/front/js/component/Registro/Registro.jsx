import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "./../config.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./../Registro/Registro.css";
import "./../../../styles/index.css";

export const Registro = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [numero_hijos, setNumero_hijos] = useState("");
  const [provincia, setProvincia] = useState("");

  const [textoAlerta, setTextoAlerta] = useState("");
  const [navegar, setNavegar] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const updateText = (e, setState) => {
    const value = e.target.value;
    setState(value);
  };

  const modalManager = (texto, canNavigate) => {
    setTextoAlerta(texto);
    setNavegar(canNavigate);
    handleShow();
  };
  const onSave = async (e) => {
    e.preventDefault();

    const body = JSON.stringify({
      email,
      password,
      nombre,
      provincia,
      numero_hijos,
    });

    const resp = await fetch(HOSTNAME + "/api/nuevo/registro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    if (!resp.ok) {
      modalManager("Error al conectar con el Servidor", false);
    }

    const data = await resp.json();

    if (data.message === "Usuario creado correctamente ") {
      modalManager(data.message, true);
    } else {
      modalManager(data.message, false);
    }
  };

  return (
    <>
      <div className=" container contenedorcentradoregistro">
        <div className="cardRegistro m-5">
          <p className="tituloRegistro">Registro</p>
          <form>
            <div className="inputBoxRegistro">
              <input
                onChange={(e) => updateText(e, setNombre)}
                value={nombre}
                id="usuario"
                type="text"
                required
              ></input>
              <span>Nombre</span>
            </div>
            <div className="inputBoxRegistro1">
              <input
                onChange={(e) => updateText(e, setEmail)}
                value={email}
                id="email"
                type="email"
                autoComplete="username"
                required
              ></input>
              <span>Email</span>
            </div>

            <div className="inputBoxRegistro2">
              <input
                onChange={(e) => updateText(e, setPassword)}
                value={password}
                type="password"
                required="required"
              ></input>
              <span>Contrase??a</span>
            </div>

            <div className="inputBoxRegistro3">
              <input
                onChange={(e) => updateText(e, setNumero_hijos)}
                value={numero_hijos}
                type="number"
                required
              ></input>
              <span>N?? hijos</span>
            </div>
            <div className="inputBoxRegistro4">
              <label className="form-label">Provincia</label>
              <select
                onChange={(e) => updateText(e, setProvincia)}
                value={provincia}
                className="form-select"
                required
              >
                <option defaultValue=""></option>
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
                  Santa Cruz de Tenerife
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

            <button
              onClick={onSave}
              className="enterRegistro"
              type="submit"
              title="Ingresar"
              name="Ingresar"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Registro</Modal.Title>
        </Modal.Header>
        <Modal.Body>{textoAlerta}</Modal.Body>
        <Modal.Footer>
          <Button
            className="button"
            variant="button"
            onClick={() => {
              if (modalManager) {
                navigate("/login");
              } else {
                handleClose();
              }
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
