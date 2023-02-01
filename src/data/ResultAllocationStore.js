import axios from "axios";
import resultRoomsStore from "./ResultRoomsStore";
import resultProgramStore from "./ResultProgramStore";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

class AllocationPost {
  startAlloc() {
    axios
      .post(`${baseUrl}/allocation/start`, {
        allocRound: 10004,
      })
      .then(function (response) {
        console.log(response);
      })
      .then(() => {
        resultRoomsStore.fetchRooms(10004);
        resultProgramStore.fetchNames(10004);
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  resetAlloc() {
    axios
      .post(`${baseUrl}/allocation/reset`, {
        allocRound: 10004,
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
