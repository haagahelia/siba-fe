//import axios from "axios";
import Logger from "../logger/logger";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

class ResultProgramStore {
  getNames() {
    return this.names ? this.names : [];
  }

  async fetchNames(id) {
    // await axios
    // .get(`${baseUrl}/allocation/${id}/program/`)
    // .then((data) => (this.names = data.data))
    // .catch((e) => console.error(e));
    const request = new Request(`${baseUrl}/allocation/${id}/program/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const response = await fetch(request);

    if (response.status === 200) {
      const names = await response.json();
      this.names = names;
    } else {
      Logger.error("Error fetching alloc programs!");
    }
  }
}

const resultProgramStore = new ResultProgramStore();
export default resultProgramStore;
