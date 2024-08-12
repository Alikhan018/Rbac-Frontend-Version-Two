import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOut, faKey } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link } from "react-router-dom";

export default function SettingsDropDown() {
  return (
    <>
      <div className="fixed top-[45px] right-[20px] border border-solid border-black flex bg-white">
        <ul className="flex flex-col gap-[10px]">
          <li className="box-border p-[5px] list-style-none border-b border-solid border-black">
            <Link href="/" className="hover:text-blue-900">
              Change Password
            </Link>
            <FontAwesomeIcon icon={faKey} style={{ paddingLeft: "5px" }} />
          </li>
          <li className="box-border p-[5px] list-style-none">
            <Link href="/" className="hover:text-blue-900">
              Logout
            </Link>
            <FontAwesomeIcon icon={faSignOut} style={{ paddingLeft: "5px" }} />
          </li>
        </ul>
      </div>
    </>
  );
}
