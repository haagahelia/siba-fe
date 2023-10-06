import axios from "axios";
import resultProgramStore from "./ResultProgramStore";
import resultRoomsStore from "./ResultRoomsStore";

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

class AllocationPost {
  startAlloc(allocRoundId) {
    axios
      .post(
        `${baseUrl}/allocation/start`,
        { allocRound: allocRoundId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      )
      .then(function (response) {
        console.log(response);
      })
      .then(() => {
        resultRoomsStore.fetchRooms(allocRoundId);
        resultProgramStore.fetchNames(allocRoundId);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  resetAlloc(allocRoundId) {
    axios
      .post(
        `${baseUrl}/allocation/reset`,
        {
          allocRound: allocRoundId,
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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

const allocationPost = new AllocationPost();
export default allocationPost;
