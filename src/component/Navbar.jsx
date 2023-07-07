import React from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo_elca.png" alt="ELCA logo" />
      </div>
      <div className="navbar-title">
        <h2
          style={{
            fontWeight: 600,
          }}
        >
          Project Information Management
        </h2>
      </div>
      <div className="navbar-options">
        <a href="#">
          EN{" "}
          <span
            style={{
              color: "#2f85fa",
            }}
          >
            {" "}
            | FR
          </span>
        </a>
        <a
          href="#"
          style={{
            color: "#2f85fa",
          }}
        >
          Help
        </a>
        <button
          onClick={() => {
            toast("Dang xuat!");
          }}
          style={{
            color: "#999999",
          }}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
