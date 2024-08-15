import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { checkPerm } from "../../utils/permissions.utils";
import { AuthContext } from "../../context/AuthProvider";

export default function DropDown({ onDelete, onEdit, entity }) {
  const { permissions } = useContext(AuthContext);
  const [allowedUpdate, setAllowedUpdate] = useState(false);
  const [allowedDelete, setAllowedDelete] = useState(false);
  useEffect(() => {
    if (checkPerm(permissions, { name: "Update", entityType: entity })) {
      setAllowedUpdate(true);
    } else {
      setAllowedUpdate(false);
    }
    if (checkPerm(permissions, { name: "Delete", entityType: entity })) {
      setAllowedDelete(true);
    } else {
      setAllowedDelete(false);
    }
  }, [entity, permissions]);
  return (
    <div className="flex flex-col w-[80px] absolute top-[10px] -left-[85px] bg-white border border-solid border-black">
    {allowedUpdate &&
      <div
        className="cursor-pointer border-b border-solid border-black flex p-[5px] justify-between items-center hover:text-blue-900"
        onClick={onEdit}
      >
        Edit
        <FontAwesomeIcon icon={faPen} style={{ color: "blue" }} />
      </div>
    }
    {allowedDelete &&
      <div
        className="cursor-pointer flex p-[5px] justify-between items-center hover:text-red-600"
        onClick={onDelete}
      >
        Delete
        <FontAwesomeIcon icon={faTrash} style={{ color: "red" }} />
      </div>
    }
    </div>
  );
}
