import React from "react";
import Form from "../../components/shared/Form/Form.jsx";
import { loginForm } from "../../props/forms.js";
import UserServices from "../../services/users.services.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider.jsx";

export default function LoginView() {
  const { setToken } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const handleLogin = async (logdata) => {
    const us = new UserServices();
    try {
      const data = await us.login(logdata);
      if (data.message === "logged in") {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate("/home");
        setErr(false);
      } else {
        setErr(true);
      }
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 w-[550px] h-[300px] flex justify-center items-center bg-gray-200 rounded-lg">
      <Form
        task={"login"}
        Err={err}
        inputs={loginForm}
        type={"login"}
        showUsers={false}
        showGroups={false}
        showRoles={false}
        onClick={handleLogin}
      />
    </div>
  );
}
