import logo from "../../assets/images/logo-navbar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import SettingsDropDown from "../SettingsDropDown/SettingsDropDown";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const iconStyle = {
    fontSize: "18px",
    cursor: "pointer",
    color: isHovered ? "#0D47A1" : "black",
  };
  return (
    <div className="flex border-b border-solid border-gray-300 justify-between w-[100%]">
      <div className="pl-[20px]">
        <img
          src={logo}
          alt="logo here"
          onClick={() => {
            navigate("home");
          }}
          className="w-[100px] h-[60px] cursor-pointer"
        />
      </div>
      <nav className="flex w-[100%] justify-center p-[10px]">
        <ul className="p-[10px] flex gap-[30px] justify-between">
          <li className="list-style-none">
            <Link to="/home" className="hover:text-blue-900">
              Home
            </Link>
          </li>
          <li className="list-style-none">
            <Link to="/users" className="hover:text-blue-900">
              Users
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-[10px] pr-[20px] flex justify-end items-center">
        <FontAwesomeIcon
          title="settings"
          icon={faGear}
          style={iconStyle}
          onMouseEnter={() => {
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            setIsHovered(false);
          }}
          onClick={() => {
            setIsClicked(!isClicked);
          }}
        />
      </div>
      {isClicked && <SettingsDropDown />}
    </div>
  );
}
