import axios from "axios";
//import React from "react";???
const baseUrl = process.env.REACT_APP_BE_SERVER_BASE_URL;

class ResultRoomsStore {
  constructor(rooms, subRooms, roomSubs) {
    this.rooms = rooms;
    this.subRooms = subRooms;
    this.roomSubs = roomSubs;
  }

  async fetchRooms(id) {
    await axios
      .get(`${baseUrl}/allocation/${id}/rooms`)
      .then((data) => (this.rooms = data.data))
      .catch((e) => console.error(e));
  }

  async fetchSubRooms(subjectId, allocationId) {
    await axios
      .get(`${baseUrl}/allocation/${allocationId}/rooms/${subjectId}`)
      .then((data) => (this.subRooms = data.data))
      .catch((e) => console.error(e));
  }

  async fetchRoomSubs(roomId, allocationId) {
    await axios
      .get(`${baseUrl}/allocation/${allocationId}/subjects/${roomId}`)
      .then((data) => (this.roomSubs = data.data))
      .catch((e) => console.error(e));
  }
}

const resultRoomsStore = new ResultRoomsStore([]);
export default resultRoomsStore;
