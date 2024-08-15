import React from "react";
import Card from "../../components/shared/Card/Card";
import { users, groups, roles } from "../../props/cards";

export default function Home() {
  return (
    <>
      <div className="w-[100%] p-[20px] flex gap-[20px] flex-wrap">
        <Card entity={users} />
        <Card entity={roles} />
        <Card entity={groups} />
      </div>
    </>
  );
}
