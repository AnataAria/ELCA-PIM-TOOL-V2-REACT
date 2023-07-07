import React from "react";
import { Link } from "react-router-dom";

function Leftnavbar() {
  return (
    <>
      <Link
        to={"/"}
        href="#"
        style={{
          fontSize: "18pt",
          color: "#2f85fa",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ProjectList
      </Link>
      <ul>
        <li>
          <Link
            to={"/"}
            href="#"
            style={{
              fontSize: "18pt",
              color: "#2f85fa",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            New
          </Link>
        </li>
        <li>
          <Link
            className="text-gray"
            to={"/projects"}
            style={{
              fontSize: "18pt",
              color: "#666666",
              fontWeight: 600,
              textDecoration: "none",
            }}
          >
            Project
          </Link>
        </li>
        <li>
          <a
            href="#"
            style={{
              fontSize: "14pt",
              color: "#666666",
              textDecoration: "none",
            }}
          >
            Customer
          </a>
        </li>
        <li>
          <a
            href="#"
            style={{
              fontSize: "14pt",
              color: "#666666",
              textDecoration: "none",
            }}
          >
            Supplier
          </a>
        </li>
      </ul>
    </>
  );
}

export default Leftnavbar;
