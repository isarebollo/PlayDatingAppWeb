import React, { useState, useEffect } from "react";
import { NavbarSinLogin } from "./NavbarSinLogin.jsx";
import { NavbarConLogin } from "./NavbarConLogin.jsx";
import "../Navbar/Navbar.css";
import "./../../../styles/index.css";

export const Navbar = () => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(true);
    } else {
      setToken(false);
    }
  }, []);

  return token ? <NavbarConLogin /> : <NavbarSinLogin />;
};
