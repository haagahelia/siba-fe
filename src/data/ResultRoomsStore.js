import axios from "axios";
import React from "react";

class ResultRoomsStore {
  constructor(rooms) {
    this.rooms = rooms;
  }

  async fetchRooms(id) {
    await axios
      .get(`http://localhost:3001/api/allocation/${id}/rooms`)
      .then((data) => (this.rooms = data.data))
      .catch((e) => console.error(e));
  }
}

const resultRoomsStore = new ResultRoomsStore([]);
export default resultRoomsStore;
