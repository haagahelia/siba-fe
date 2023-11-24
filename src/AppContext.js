import { createContext, useState } from "react";

export const AppContext = createContext({
  // allocRoundId: 10004,
  // allocRoundName: "N/A", // Now using AllocRoundContext
  userId: null,
  userEmail: null,
  sessionToken: null,
  roles: { admin: 0, planner: 0, statist: 0 },
});

export const AllocRoundContext = createContext({
  allocRoundId: 10004,
  allocRoundName: "Demo",
});
