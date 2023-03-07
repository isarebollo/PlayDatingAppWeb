import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HOSTNAME } from "./../config.js";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "../Login/Login.css";
import "./../../../styles/index.css";

export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    if (email === "" || password === "" || password.length < 4) {
    } else {
      const body = JSON.stringify({
        email,
        password,
      });

      const resp = await fetch(HOSTNAME + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.token}`,
        },
        body,
      });

      if (!resp.ok) {
        modalManager("Error en el servidor", false);
      }
      const data = await resp.json();

      if (data.data !== undefined) {
        localStorage.setItem("token", data.data);
        localStorage.setItem("usuario", data.usuario_id);

        navigate("/home");
        window.location.reload();
      } else {
        modalManager("El usuario no existe", true);
      }
    }
  };
  return (
    <>
      <div className="container containerLogin m-5 ">
        <div className="card cardLogin">
          <a className="singup">Login</a>
          <div className="inputBox1">
            <input
              autoComplete="current-user"
              onChange={(e) => updateText(e, setEmail)}
              value={email}
              type="text"
              required="required"
            ></input>
            <span className="user">Email</span>
          </div>

          <div className="inputBox">
            <input
              autoComplete="current-password"
              onChange={(e) => updateText(e, setPassword)}
              value={password}
              type="password"
              required="required"
            />
             
            <span>Password</span>
          </div>

          <button onClick={onSave} className="enter">
            Enter
          </button>
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
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>{textoAlerta}</Modal.Body>
          <Modal.Footer>
            <Button
              className="button mx-auto"
              variant="primary"
              onClick={() => {
                if (modalManager) {
                  navigate("/register");
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
