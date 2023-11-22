import { createContext } from "react";

export const AppContext = createContext({
  allocRound: { id: 0, name: "N/A" },
  userEmail: null,
  sessionToken: null,
  roles: { admin: 0, planner: 0, statist: 0 },
});
