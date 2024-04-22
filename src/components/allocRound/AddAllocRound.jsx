import { useLocation } from "react-router-dom";

import { CommonContainer } from "../common/CommonContainers";
import { AddEmptyAllocRound } from "./AddEmptyAllocRound";
import { CopyAllocRound } from "./CopyAllocRound";

// const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;
// import { BASEURL } from "../config/consts.js";
// const baseUrl = BASEURL;

export default function AddAllocRound() {
  const location = useLocation();
  const allAllocRoundsList = location.state?.allAllocRoundsList;

  return (
    <CommonContainer>
      <AddEmptyAllocRound allAllocRoundsList={allAllocRoundsList} />

      <CopyAllocRound allAllocRoundsList={allAllocRoundsList} />
    </CommonContainer>
  );
}
