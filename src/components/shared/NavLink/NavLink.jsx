import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import { checkPerm } from "../../../utils/permissions.utils";

export default function NavLink({ link, name }) {
  const { permissions } = React.useContext(AuthContext);
  const [allowed, setAllowed] = React.useState(false);
  React.useEffect(() => {
    if (checkPerm(permissions, { name: "Read", entityType: name })) {
      setAllowed(true);
    } else {
      setAllowed(false);
    }
  }, [allowed, name, permissions]);

  if (!allowed && name !== "Home") {
    return <></>;
  }
  return (
    <Link to={link} className="hover:text-blue-900">
      {name}
    </Link>
  );
}
