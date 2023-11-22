import { useContext, useState } from "react";
import { AppContext } from "../AppContext.js";
import { ActiveAllocRound } from "../types/index.js";

export const useActiveAllocRound = () => {
  const [allocRound, setAllocRound] = useState<ActiveAllocRound>({
    id: Number(localStorage.getItem("allocRoundId") || -1),
    name: localStorage.getItem("allocRoundName") || "N/AA",
  });

  const appContext = useContext(AppContext);
  appContext.allocRound.id = +(localStorage.getItem("allocRoundId") || "-1");
  appContext.allocRound.name = localStorage.getItem("allocRoundName") || "N/AA";

  return { allocRound, setAllocRound };
};
