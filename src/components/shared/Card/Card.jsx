import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserServices from "../../../services/users.services.js";
import RolesServices from "../../../services/roles.services.js";
import GroupsServices from "../../../services/groups.services.js";
import { useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider.jsx";
import { checkPerm } from "../../../utils/permissions.utils.js";

export default function Card({ entity }) {
  const { permissions } = useContext(AuthContext);

  const navigate = useNavigate();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const getCount = async () => {
      if (entity.name === "Users") {
        const us = new UserServices();
        setNumber(await us.count());
      }
      if (entity.name === "Roles") {
        const rs = new RolesServices();
        setNumber(await rs.count());
      }
      if (entity.name === "Groups") {
        const gs = new GroupsServices();
        setNumber(await gs.count());
      }
    };
    getCount();
  }, [entity.name]);
  if (!checkPerm(permissions, { name: "Read", entityType: entity.name })) {
    return null;
  }
  return (
    <div className="w-[300px] box-border p-[20px] border border-solid border-gray-300">
      <div
        className="flex flex-col gap-[10px] cursor-pointer hover:text-blue-900"
        onClick={() => {
          navigate(`/${entity.link}`);
        }}
      >
        <div className="flex justify-between items-center">
          <div className="flex gap-[5px] items-center">
            <FontAwesomeIcon icon={entity.icon} />
            <span>{entity.name}</span>
          </div>
          {/* <Link to={`/${entity.link}`}>
            <FontAwesomeIcon icon={faUpRightFromSquare} className="open" />
          </Link> */}
        </div>
        <div className="">
          Total {entity.name}: {number}
        </div>
      </div>
    </div>
  );
}
