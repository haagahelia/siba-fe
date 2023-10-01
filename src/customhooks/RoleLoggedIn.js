import { useContext, useState } from "react";
import { AppContext } from "../AppContext";

export const RoleLoggedIn = () => {
  const [roles, setRoles] = useState({
    admin: localStorage.getItem("isAdmin"),
    planner: localStorage.getItem("isPlanner"),
    statist: localStorage.getItem("isStatist"),
  });

  const appContext = useContext(AppContext);
  appContext.roles.admin = localStorage.getItem("isAdmin");
  appContext.roles.planner = localStorage.getItem("isPlanner");
  appContext.roles.statist = localStorage.getItem("isStatist");

  return { roles, setRoles };
};
