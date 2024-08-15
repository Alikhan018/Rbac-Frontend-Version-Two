import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/index.services";
import DataComponent from "../../components/shared/DataComponent/DataComponent";
import { faGear, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../context/AuthProvider";
import { checkPerm } from "../../utils/permissions.utils.js";

export default function ViewData({ entity, showUsers, showRoles, showGroups }) {
  const { permissions } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const icon = useMemo(() => {
    if (!showRoles) return faGear;
    if (!showUsers) return faUser;
    if (!showGroups) return faUserGroup;
    return "";
  }, [showUsers, showGroups, showRoles]);

  const [allowedUsers, setAllowedUsers] = useState(false);
  const [allowedGroups, setAllowedGroups] = useState(false);
  const [allowedRoles, setAllowedRoles] = useState(false);
  const location = useLocation();
  const id = location.state.id || 0;
  const [data, setData] = useState([]);
  useEffect(() => {
    if (checkPerm(permissions, { name: "Read", entityType: "Users" })) {
      setAllowedUsers(true);
    } else {
      setAllowedUsers(false);
    }
    if (checkPerm(permissions, { name: "Read", entityType: "Roles" })) {
      setAllowedRoles(true);
    } else {
      setAllowedRoles(false);
    }
    if (checkPerm(permissions, { name: "Read", entityType: "Groups" })) {
      setAllowedGroups(true);
    } else {
      setAllowedGroups(false);
    }
  }, [allowedGroups, allowedRoles, allowedUsers, permissions]);
  useEffect(() => {
    const fetch = async () => {
      if (entity === "users" && allowedUsers) {
        setData(await fetchData(`${entity}/${id}`));
      }
      if (entity === "groups" && allowedGroups) {
        setData(await fetchData(`${entity}/${id}`));
      }
      if (entity === "roles" && allowedRoles) {
        setData(await fetchData(`${entity}/${id}`));
      }
    };
    fetch();
  }, [id, entity, allowedGroups, allowedRoles, allowedUsers, permissions]);
  const changeButtonClick = () => {
    navigate("change-password", { state: { id: data.id } });
  };

  return (
    <div>
      {id && (allowedGroups || allowedRoles || allowedUsers) ? (
        <div className="w-[100%] flex flex-col justify-center items-center py-[20px] px-[0px] bg-gray-200">
          <DataComponent
            type={entity}
            entity={data}
            icon={icon}
            showUsers={showUsers}
            showRoles={showRoles}
            showGroups={showGroups}
            onClick={changeButtonClick}
            allowedUsers={allowedUsers}
            allowedGroups={allowedGroups}
            allowedRoles={allowedRoles}
          />
        </div>
      ) : (
        <div>No id found</div>
      )}
    </div>
  );
}
