import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function DropDown({ onDelete, onEdit }) {
  return (
    <div className="flex flex-col w-[80px] absolute top-[10px] -left-[85px] bg-white border border-solid border-black">
      <div
        className="cursor-pointer border-b border-solid border-black flex p-[5px] justify-between items-center hover:text-blue-900"
        onClick={onEdit}
      >
        Edit
        <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
      </div>
      <div
        className="cursor-pointer flex p-[5px] justify-between items-center hover:text-red-600"
        onClick={onDelete}
      >
        Delete
        <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
      </div>
    </div>
  );
}
