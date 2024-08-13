import React, { useEffect, useState, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../services/index.services";
import DataComponent from "../../components/shared/DataComponent/DataComponent";
import { faGear, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";

export default function ViewData({ entity, showUsers, showRoles, showGroups }) {
  const navigate = useNavigate();
  const icon = useMemo(() => {
    if (!showRoles) return faGear;
    if (!showUsers) return faUser;
    if (!showGroups) return faUserGroup;
    return "";
  }, [showUsers, showGroups, showRoles]);
  const location = useLocation();
  const id = location.state.id || 0;
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      setData(await fetchData(`${entity}/${id}`));
    };
    fetch();
  }, [id, entity]);
  const changeButtonClick = () => {
    navigate("change-password", { state: { id: data.id } });
  };

  return (
    <div>
      {id ? (
        <div className="w-[100%] flex flex-col justify-center items-center py-[20px] px-[0px] bg-gray-200">
          <DataComponent
            type={entity}
            entity={data}
            icon={icon}
            showUsers={showUsers}
            showRoles={showRoles}
            showGroups={showGroups}
            onClick={changeButtonClick}
          />
        </div>
      ) : (
        <div>No id found</div>
      )}
    </div>
  );
}
