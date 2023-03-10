import axios from "axios";
import resultRoomsStore from "./ResultRoomsStore";
import resultProgramStore from "./ResultProgramStore";

const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

class AllocationPost {
  startAlloc(allocRoundId) {
    axios
      .post(`${baseUrl}/allocation/start`, {
        allocRound: allocRoundId,
      })
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
      .post(`${baseUrl}/allocation/reset`, {
        allocRound: allocRoundId,
      })
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
