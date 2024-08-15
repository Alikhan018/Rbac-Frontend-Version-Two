import { useContext, useEffect, useMemo, useState } from "react";
import BasicTable from "../MaterialTable/MT";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faKey, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import UserServices from "../../../services/users.services";
import RolesServices from "../../../services/roles.services";
import GroupServices from "../../../services/groups.services";
import { AuthContext } from "../../../context/AuthProvider";
import { checkPerm } from "../../../utils/permissions.utils.js";

const designs = {
  roles:
    "relative top-[25px] left-[-136px] border border-solid border-blue-900 h-[0px] w-[50px]",
  users:
    "relative top-[25px] left-[-69px] border border-solid border-blue-900 h-[0px] w-[50px]",
  users_two:
    "relative top-[25px] left-[-148px] border border-solid border-blue-900 h-[0px] w-[50px]",
  groups_two:
    "relative top-[25px] left-[-78px] border border-solid border-blue-900 h-[0px] w-[60px]",
  roles_two:
    "relative top-[25px] left-[-148px] border border-solid border-blue-900 h-[0px] w-[50px]",
};

export default function DataComponent({
  type,
  entity,
  icon,
  showRoles,
  showGroups,
  showUsers,
  onClick,
  allowedGroups,
  allowedRoles,
  allowedUsers,
}) {
  const navigate = useNavigate();
  const { permissions } = useContext(AuthContext);

  const [allowUpdate, setAllowUpdate] = useState(false);
  const [allowDelete, setAllowDelete] = useState(false);
  const initialSelected = useMemo(() => {
    if (allowedRoles && type !== "groups") return "roles";
    if (allowedUsers && type !== "users") return "users";
    if (allowedGroups && type !== "groups") return "groups";
    return "";
  }, [type, allowedUsers, allowedRoles, allowedGroups]);

  useEffect(() => {
    if (
      checkPerm(permissions, {
        name: "Update",
        entityType: type.charAt(0).toUpperCase() + type.slice(1),
      })
    ) {
      setAllowUpdate(true);
    } else {
      setAllowUpdate(false);
    }
    if (
      checkPerm(permissions, {
        name: "Delete",
        entityType: type.charAt(0).toUpperCase() + type.slice(1),
      })
    ) {
      setAllowDelete(true);
    } else {
      setAllowDelete(false);
    }
  }, [type, permissions]);

  const [selected, setSelected] = useState(initialSelected);
  return (
    <div className="flex gap-[60px]">
      <div className="flex flex-col gap-[10px]">
        <FontAwesomeIcon
          icon={icon}
          style={{ width: "200px", height: "50px" }}
        />
        {allowUpdate && (
          <>
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
          </>
        )}
        {allowDelete && (
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
        )}
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h3 className="md:uppercase text-[26px]">
            {entity.name || entity.email}
          </h3>
          <div>
            {showRoles && allowedRoles && (
              <p className="text-[14px] hover:text-blue-900">
                Roles: {entity["roles"]?.length}
              </p>
            )}
            {showUsers && allowedUsers && (
              <p className="text-[14px] hover:text-blue-900">
                Users: {entity["users"]?.length}
              </p>
            )}
            {showGroups && allowedGroups && (
              <p className="text-[14px] hover:text-blue-900">
                Groups: {entity["groups"]?.length}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-[20px]">
          {showRoles && allowedRoles && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("roles")}
            >
              Roles
            </p>
          )}
          {showUsers && allowedUsers && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("users")}
            >
              Users
            </p>
          )}
          {showGroups && allowedGroups && (
            <p
              className="cursor-pointer text-[20px] hover:text-blue-900"
              onClick={() => setSelected("groups")}
            >
              Groups
            </p>
          )}
          {((selected === "users" && allowedRoles && allowedGroups) ||
            (selected === "groups" && allowedUsers && allowedRoles) ||
            (selected === "roles" && allowedGroups && allowedUsers)) && (
            <div
              className={`
                  ${showRoles && showUsers ? `${designs[selected]}` : ""}
                  ${
                    showGroups && showUsers
                      ? `${designs[`${selected}_two`]}`
                      : ""
                  }
                  ${
                    showRoles && showGroups
                      ? `${designs[`${selected}_two`]}`
                      : ""
                  }
                `}
            ></div>
          )}
        </div>
        {(allowedRoles || allowedGroups || allowedUsers) && (
          <BasicTable
            rows={entity[selected]}
            onDelete={() => {}}
            action={false}
            entity={selected}
          />
        )}
      </div>
    </div>
  );
}
