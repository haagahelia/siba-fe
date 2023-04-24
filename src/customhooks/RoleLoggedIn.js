import { useState } from "react";

export const RoleLoggedIn = () => {
  const [roles, setRoles] = useState({
    admin: localStorage.getItem("isAdmin"),
    planner: localStorage.getItem("isPlanner"),
    statist: localStorage.getItem("isStatist"),
  });

  return { roles, setRoles };
};
