import { createContext } from "react";

export const AppContext = createContext({
  allocRoundId: 10004,
  userEmail: null,
  sessionToken: null,
  roles: { admin: 0, planner: 0, statist: 0 },
});
