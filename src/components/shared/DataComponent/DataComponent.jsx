import React, { useMemo, useState } from "react";
import BasicTable from "../MaterialTable/MT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faKey, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/users.services";
import RolesServices from "../../../services/roles.services";
import GroupServices from "../../../services/groups.services";

export default function DataComponent({
  type,
  entity,
  icon,
  showRoles,
  showGroups,
  showUsers,
  onClick,
}) {
  const navigate = useNavigate();
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);
  const [selected, setSelected] = useState(initialSelected);
  return (
    <div className="flex gap-[60px]">
      <div className="flex flex-col gap-[10px]">
        <FontAwesomeIcon
          icon={icon}
          style={{ width: "200px", height: "50px" }}
        />
        <Button
          text={`Edit ${entity.name || entity.email}`}
          type={"submit"}
          icon={faPen}
          onClick={() => {
            navigate(`/edit-${type.slice(0, -1)}`, {
              state: { id: entity.id },
            });
          }}
        />
        {!showUsers && (
          <Button
            text={"Change Password"}
            type={"button"}
            icon={faKey}
            onClick={onClick}
          />
        )}
        <Button
          text={`Delete ${entity.name || entity.email}`}
          type={"reset"}
          icon={faTrash}
          onClick={async () => {
            if (type === "users") {
              const us = new UserServices();
              try {
                us.deleteUser(entity.id);
              } catch (err) {
                console.log(err);
              }
            }
            if (type === "roles") {
              const rs = new RolesServices();
              try {
                rs.deleteRole(entity.id);
              } catch (err) {
                console.log(err);
              }
            }
            if (type === "groups") {
              const gs = new GroupServices();
              try {
                gs.deleteGroup(entity.id);
              } catch (err) {
                console.log(err);
              }
            }
            navigate(`/${type}`);
          }}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h3 className="md:uppercase text-[26px]">
            {entity.name || entity.email}
          </h3>
          <div>
            {showRoles && (
              <p className="text-[14px] hover:text-blue-900">
                Roles: {entity["roles"]?.length}
              </p>
            )}
            {showUsers && (
              <p className="text-[14px] hover:text-blue-900">
                Users: {entity["users"]?.length}
              </p>
            )}
            {showGroups && (
              <p className="text-[14px] hover:text-blue-900">
                Groups: {entity["groups"]?.length}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-[20px]">
          {showRoles && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("roles")}
            >
              Roles
            </p>
          )}
          {showUsers && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("users")}
            >
              Users
            </p>
          )}
          {showGroups && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("groups")}
            >
              Groups
            </p>
          )}
          <div
            className={`
                  ${showRoles && showUsers ? `underline-${selected}-two` : ""}
                  ${showGroups && showUsers ? `underline-${selected}` : ""}
                  ${showRoles && showGroups ? `underline-${selected}` : ""}
                `}
          ></div>
        </div>
        <BasicTable
          rows={entity[selected]}
          onDelete={() => {}}
          action={false}
        />
      </div>
    </div>
  );
}
