import { createContext } from "react";

export const AppContext = createContext({
  userId: null,
  userEmail: null,
  sessionToken: null,
  roles: { admin: 0, planner: 0, statist: 0 },
  settings: { itemsPerPage: 15, spaceUnderUsage: 40, spaceOverUsage: 50 },
});

export const AllocRoundContext = createContext({
  allocRoundId: 0,
  allocRoundName: "Pick Allocation!",
});
