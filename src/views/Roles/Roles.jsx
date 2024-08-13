import React, { useState, useEffect } from "react";
import RolesServices from "../../services/roles.services";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import { headerRoles } from "../../props/tables";
import { useNavigate } from "react-router-dom";
export default function Groups() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const rs = new RolesServices();
    const getData = async () => {
      try {
        const response = await rs.getAllRoles();
        setRoles(response.data);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    getData();
  }, [roles]);
  const onDelete = (id) => {
    const rs = new RolesServices();
    try {
      rs.deleteRole(id);
      const filter = roles.filter((role) => role.id !== id);
      setRoles(filter);
    } catch (err) {
      console.log(err);
    }
  };
  const onEdit = (id) => {
    navigate("/edit-role", { state: { id } });
  };
  const handleAddClick = () => {
    navigate("/add-new-role");
  };
  return (
    <>
      <div className="w-[100%] flex flex-col justify-center items-center py-[20px]">
        {err && <Error />}
        <h1 className="text-[28px] pb-[20px]">Roles</h1>
        {roles && (
          <Table
            header={headerRoles}
            data={roles}
            onDelete={onDelete}
            onEdit={onEdit}
            btnText={"Add new role"}
            onAdd={handleAddClick}
            addBtn={true}
          />
        )}
      </div>
    </>
  );
}
