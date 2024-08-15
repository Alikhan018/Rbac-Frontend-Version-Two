import logo from "../../assets/images/logo-navbar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
import SettingsDropDown from "../SettingsDropDown/SettingsDropDown";
import { useNavigate } from "react-router-dom";
import WithAuth from "../../hoc/WithAuth";
import NavLink from "../shared/NavLink/NavLink";

export default WithAuth(function Navbar() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
        <ul className="p-[10px] flex gap-[30px] justify-between list-style-none">
          <li className="">
            <NavLink link={"/home"} name={"Home"} />
          </li>
          <li className="">
            <NavLink link={"/users"} name={"Users"} />
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
            setIsClicked((prev) => !prev);
          }}
        />
      </div>
      {isClicked && (
        <div ref={dropdownRef}>
          <SettingsDropDown />
        </div>
      )}
    </div>
  );
});
