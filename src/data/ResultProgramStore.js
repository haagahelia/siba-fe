import axios from "axios";
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

class ResultProgramStore {
  getNames() {
    return this.names ? this.names : [];
  }

  async fetchNames(id) {
    await axios
      .get(`${baseUrl}/allocation/${id}/program/`)
      .then((data) => (this.names = data.data))
      .catch((e) => console.error(e));
  }
}

const resultProgramStore = new ResultProgramStore();
export default resultProgramStore;
