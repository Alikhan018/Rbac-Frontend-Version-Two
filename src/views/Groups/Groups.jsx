import React, { useState, useEffect } from "react";
import GroupServices from "../../services/groups.services";
import Table from "../../components/shared/Table/Table";
import Error from "../../components/Error/Error";
import { headerGroups } from "../../props/tables";

export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [err, setErr] = useState(false);
  const gs = new GroupServices();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await gs.getAllGroups();
        setGroups(response.data);
        setErr(false);
      } catch (err) {
        console.log(err);
        setErr(true);
      }
    };
    getData();
  }, []);
  const onDelete = (id) => {
    try {
      gs.deleteGroup(id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="user-container">
        <h1>Groups</h1>
        {err && <Error />}
        {groups && (
          <Table header={headerGroups} data={groups} onDelete={onDelete} />
        )}
      </div>
    </>
  );
}
