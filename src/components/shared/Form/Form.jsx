// import "./scss/form.css";
import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import Button from "../Button/Button";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import BasicTable from "../MaterialTable/MT";
import { useLocation } from "react-router-dom";
import {
  fetchEntity,
  getAllDataForEntities,
} from "../../../services/index.services";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const designs = {
  roles:
    "relative top-[25px] left-[-126px] border border-solid border-blue-900 h-[0px] w-[45px]",
  users:
    "relative top-[25px] left-[-66px] border border-solid border-blue-900 h-[0px] w-[50px]",
  users_two:
    "relative top-[25px] left-[-137px] border border-solid border-blue-900 h-[0px] w-[45px]",
  groups_two:
    "relative top-[25px] left-[-76px] border border-solid border-blue-900 h-[0px] w-[60px]",
  roles_two:
    "relative top-[25px] left-[-136px] border border-solid border-blue-900 h-[0px] w-[45px]",
};

export default function Form({
  task,
  inputs,
  type,
  showUsers,
  showGroups,
  showRoles,
  onClick,
  Err,
}) {
  const isOptionEqualToValue = (option, value) => option.id !== value.id; //idk but its making autocomplete work
  const initialSelected = useMemo(() => {
    if (showRoles) return "roles";
    if (showUsers) return "users";
    if (showGroups) return "groups";
    return "";
  }, [showUsers, showGroups, showRoles]);

  //States declaration
  const [selectValueMap, setSelectValueMap] = useState({}); //states for all entities for all selects to retrive ids and names/email
  const [formData, setFormData] = useState({}); //formData state
  const [selected, setSelected] = useState(initialSelected); //to represent which entity is selected to view in table under the form
  const [selectList, setSelectList] = useState([]); //rendering list for select
  const [selectValues, setSelectValues] = useState({
    users: [],
    roles: [],
    groups: [],
  }); //state to show selected items by user
  const [selectValuesForRender, setSelectValuesForRender] = useState({
    users: [],
    roles: [],
    groups: [],
  }); //state to represent value of select
  //end of state declaration

  const location = useLocation();
  const { id } = location.state || {};

  useEffect(() => {
    const initializeFormData = inputs.reduce((entry, field) => {
      if (field.options.type === "input") {
        entry[field.id] = "";
      } else if (["roles", "users", "groups"].includes(field.name)) {
        entry[field.name] = [];
      }
      return entry;
    }, {});

    setFormData(initializeFormData);
  }, [inputs]);

  useEffect(() => {
    const fetchSelects = async () => {
      const allDataObj = await getAllDataForEntities();
      setSelectList(allDataObj);
      setSelectValuesForRender(allDataObj);
    };
    if (task !== "change-password") {
      fetchSelects();
    }
  }, [task]);

  useEffect(() => {
    if (task === "update" && id) {
      const fetchData = async () => {
        const data = await fetchEntity(showUsers, showGroups, showRoles, id);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
        }));
      };
      fetchData();
    }
  }, [task, showUsers, showGroups, showRoles, id]);

  useEffect(() => {
    const map = {};
    Object.keys(selectValuesForRender).forEach((key) => {
      const values = selectValuesForRender[key];
      if (Array.isArray(values)) {
        values.forEach(({ id, name, email }) => {
          map[name || email] = id;
        });
      }
    });
    setSelectValueMap(map);
  }, [selectValuesForRender]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSelectChange = (name) => (event, newValue) => {
    if (!newValue) return;
    const value = newValue.name || newValue.email || "";
    const id = selectValueMap[value];
    if (id !== undefined) {
      setSelectValues((prevSelectValues) => {
        const updatedValues = prevSelectValues[name].some(
          (item) => item.id === id
        )
          ? prevSelectValues[name]
          : [{ value, id }];

        return {
          ...prevSelectValues,
          [name]: updatedValues,
        };
      });
    }
  };

  const handleButtonClick = (name) => {
    const selectValue = selectValues[name];
    if (!selectValue || selectValue.length === 0) {
      return;
    }

    setFormData((prevFormData) => {
      const existingEntries = prevFormData[name] || [];
      const newEntries = selectValue.filter(
        (entry) => !existingEntries.some((e) => e.id === entry.id)
      );
      return {
        ...prevFormData,
        [name]: [...existingEntries, ...newEntries],
      };
    });
    setSelectValues((prevSelectValues) => ({
      ...prevSelectValues,
      [name]: [],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClick(formData);
  };

  return (
    <form
      className="flex flex-col w-[500px] justify-center gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        {Err && <div style={{ color: "red" }}>Invalid Credentials!</div>}
        {inputs
          .filter((input) => input.options.type !== "button")
          .map(({ id, type, label, name, required }) => {
            if (task === "update" && type === "password") return null;

            const inputValue = formData[id] || "";
            const selectValue = selectValuesForRender[name]?.[0]?.name || "";

            if (type === "select" || type === "inputWithBtn") {
              const optionsList = Array.isArray(selectList[name])
                ? selectList[name]
                : [];
              return (
                <div key={id} className="flex w-full gap-3">
                  <Autocomplete
                    disablePortal
                    id={id}
                    options={optionsList}
                    sx={{
                      width: 417,
                      backgroundColor: "white",
                    }}
                    getOptionLabel={(option) =>
                      option.name || option.email || ""
                    }
                    isOptionEqualToValue={isOptionEqualToValue}
                    value={selectValue || "" || null}
                    onChange={handleSelectChange(name)}
                    renderInput={(params) => (
                      <TextField {...params} label={label} variant="outlined" />
                    )}
                  />
                  <Button
                    text={"Add"}
                    type={"button"}
                    onClick={() => handleButtonClick(name)}
                    icon={faAdd}
                  />
                </div>
              );
            }

            return (
              <div key={id} className="flex flex-col">
                <input
                  className="peer p-1 h-[43px] w-[495px] border border-gray-300 focus:outline-none focus:border-blue-500 valid:border-blue-500 valid:outline-none text-sm rounded-md"
                  name={name}
                  id={id}
                  type={type}
                  value={inputValue}
                  onChange={handleChange}
                  required={required}
                />
                <label
                  htmlFor={id}
                  className="relative -top-8 left-2 text-gray-500 duration-100 peer-focus:top-[-41px] 
               peer-focus:left-[4px] peer-focus:text-blue-500 peer-focus:bg-white 
               peer-focus:text-[9px] peer-valid:top-[-41px] 
               peer-valid:left-[7px] peer-valid:text-blue-500 peer-valid:bg-white 
               peer-valid:text-[9px] peer-focus: w-[150px]"
                >
                  {label}
                </label>
              </div>
            );
          })}
      </div>

      {type === "add/update" && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-5">
            {showRoles && (
              <p
                className="cursor-pointer text-lg"
                onClick={() => setSelected("roles")}
              >
                Roles
              </p>
            )}
            {showUsers && (
              <p
                className="cursor-pointer text-lg"
                onClick={() => setSelected("users")}
              >
                Users
              </p>
            )}
            {showGroups && (
              <p
                className="cursor-pointer text-lg"
                onClick={() => setSelected("groups")}
              >
                Groups
              </p>
            )}
            {selected && (
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
          <BasicTable
            rows={formData[selected] || []}
            entity={selected}
            onDelete={(id) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                [selected]: prevFormData[selected].filter(
                  (item) => item.id !== id
                ),
              }));
            }}
            action={true}
          />
        </div>
      )}
      <div className="flex flex-col items-end gap-1">
        {inputs
          .filter((input) => input.options.type === "button")
          .map((button) => (
            <button
              className="w-[200px] py-2 px-1 bg-blue-700  rounded-md cursor-pointer text-white border-1 border-blue-700 border-solid hover:bg-blue-900 hover:border-1 hover:border-blue-900"
              key={button.id}
              type={button.type}
            >
              {button.label}
            </button>
          ))}
        {inputs[0]?.label === "Login" && <a href="/">Forgot Password?</a>}
      </div>
    </form>
  );
}

Form.propTypes = {
  task: PropTypes.string.isRequired,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      selectValues: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string,
          email: PropTypes.string,
        })
      ),
      options: PropTypes.shape({
        type: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
  type: PropTypes.string,
  showUsers: PropTypes.bool,
  showGroups: PropTypes.bool,
  showRoles: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  Err: PropTypes.string,
};
