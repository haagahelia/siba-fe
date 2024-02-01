import axios from "axios";
import Logger from "../logger/logger";
import resultProgramStore from "./ResultProgramStore";
import resultRoomsStore from "./ResultRoomsStore";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

class AllocationPost {
  startAlloc(allocRoundId) {
    axios
      .post(
        `${baseUrl}/allocation/start`,
        { allocRoundId: allocRoundId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then(function (response) {
        Logger.debug("start allocation:", response);
      })
      .then(() => {
        resultRoomsStore.fetchRooms(allocRoundId);
        resultProgramStore.fetchNames(allocRoundId);
      })
      .catch(function (error) {
        Logger.error("start allocation failed:", error);
      });
  }

  resetAlloc(allocRoundId) {
    axios
      .post(
        `${baseUrl}/allocation/reset`,
        {
          allocRoundId: allocRoundId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then(function (response) {
        Logger.debug("reset allocation:", response);
      })
      .catch(function (error) {
        Logger.error("reset allocation failed:", error);
      });
  }
}

const allocationPost = new AllocationPost();
export default allocationPost;
