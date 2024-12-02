import { createContext, useState } from "react";

export const AppContext = createContext({
  // allocRoundId: 10004,
  // allocRoundName: "N/A", // Now using AllocRoundContext
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

export const AllocRoundProvider = ({ children }) => {
  const [allocRoundContext, setAllocRoundContext] = useState({
    allocRoundId: Number(localStorage.getItem("allocRoundId")) || 0,
    allocRoundName:
      localStorage.getItem("allocRoundName") || "Pick Allocation!",
  });

  return (
    <AllocRoundContext.Provider
      value={{ ...allocRoundContext, setAllocRoundContext }}
    >
      {children}
    </AllocRoundContext.Provider>
  );
};
