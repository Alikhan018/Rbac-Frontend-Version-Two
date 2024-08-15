import React from "react";
import { Link } from "react-router-dom";

export default function NavLink({ link, name }) {
  return (
    <Link to={link} className="hover:text-blue-900">
      {name}
    </Link>
  );
}
