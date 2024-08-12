import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Button({ text, type, icon, onClick }) {
  let className =
    "py-[5px] px-[10px] text-white rounded-lg cursor-pointer border-none flex items-center justify-around gap-[5px]";
  if (type === "submit") {
    className = `${className} bg-blue-800 hover:bg-blue-900`;
  }
  if (type === "reset") {
    className = `${className} bg-red-700 hover:bg-red-900`;
  }
  if (type === "button") {
    className = `${className} bg-green-700 hover:bg-green-900`;
  }
  return (
    <button type={type} className={className} onClick={onClick}>
      {text} <FontAwesomeIcon icon={icon} />
    </button>
  );
}
