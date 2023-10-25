import axios from "axios";
// import React from "react"; ???

const baseUrl = import.meta.env.VITE_BE_SERVER_BASE_URL;

class ResultRoomsStore {
  constructor(rooms, subRooms, roomSubs) {
    this.rooms = rooms;
    this.subRooms = subRooms;
    this.roomSubs = roomSubs;
  }

  async fetchRooms(allocationRoundId) {
    await axios
      .get(`${baseUrl}/allocation/${allocationRoundId}/rooms`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.rooms = data.data;
      })
      .catch((e) => console.error(e));
  }

  async fetchSubRooms(subjectId, allocationRoundId) {
    await axios
      .get(`${baseUrl}/allocation/${allocationRoundId}/rooms/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.subRooms = data.data;
      })
      .catch((e) => console.error(e));
  }

  async fetchRoomSubs(roomId, allocationRoundId) {
    await axios
      .get(`${baseUrl}/allocation/${allocationRoundId}/subjects/${roomId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("sessionToken")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((data) => {
        this.roomSubs = data.data;
      })
      .catch((e) => console.error(e));
  }
}

const resultRoomsStore = new ResultRoomsStore([]);
export default resultRoomsStore;
