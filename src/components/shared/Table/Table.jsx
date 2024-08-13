import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import DropDown from "../../DropDown/DropDown";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

export default function Table({
  header,
  data,
  onDelete,
  btnText,
  onAdd,
  addBtn,
  onEdit,
}) {
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);

  const keys = Object.keys(header);

  useEffect(() => {
    const handleClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setClickedIndex(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  return (
    <div className="w-[90%] flex items-end flex-col gap-[10px]">
      {addBtn && (
        <Button text={btnText} type={"submit"} icon={faAdd} onClick={onAdd} />
      )}
      <div className="w-[100%] flex items-end flex-col">
        <div className="px-[5px] box-border flex w-[100%] justify-between bg-blue-800 text-white border border-blue-800">
          {keys.map((key, index) => (
            <span className="w-[25%] text-left first:w-[10%]" key={index}>
              {header[key]}
            </span>
          ))}
        </div>
        <div className="px-[5px] box-border border border-solid border-black w-[100%]">
          {data.map((tuple, tupleIndex) => (
            <div
              key={tupleIndex}
              className="flex w-[100%] border-b border-black justify-between cursor-pointer last:border-b-0"
              style={{
                color: hoveredIndex === tupleIndex ? "#0D47A1" : "black",
              }}
              onMouseEnter={() => setHoveredIndex(tupleIndex)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => {
                navigate(`${tuple.id}`, {
                  state: { id: tuple.id },
                });
              }}
            >
              {keys.map((key, keyIndex) => (
                <span
                  className="w-[25%] text-left first:w-[10%]"
                  key={keyIndex}
                  data-label={key}
                  style={{ position: "relative" }}
                >
                  {key === "actions" ? (
                    <>
                      <FontAwesomeIcon
                        icon={faEllipsisV}
                        style={{
                          width: "10px",
                          cursor: "pointer",
                          color: hoveredIndex === tupleIndex ? "blue" : "black",
                          display: "flex",
                          position: "absolute",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          padding: "3px 0px 0px 0px",
                          zIndex: 10,
                        }}
                        onMouseEnter={() => setHoveredIndex(tupleIndex)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setClickedIndex(
                            clickedIndex === tupleIndex ? null : tupleIndex
                          );
                        }}
                      />
                      {clickedIndex === tupleIndex && (
                        <div ref={dropdownRef}>
                          <DropDown
                            onDelete={(e) => {
                              e.stopPropagation();
                              onDelete(tuple.id);
                            }}
                            onEdit={(e) => {
                              e.stopPropagation();
                              onEdit(tuple.id);
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    tuple[key]
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
