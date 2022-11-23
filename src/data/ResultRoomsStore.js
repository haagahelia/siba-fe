import axios from 'axios'
import React from 'react'


    class ResultRoomsStore {

        constructor(rooms, subRooms) {
            this.rooms = rooms
            this.subRooms = subRooms
        }

        async fetchRooms(id) {
           await axios.get(`http://localhost:3001/api/allocation/${id}/rooms`)
           .then(data => this.rooms = data.data)
           .catch(e => console.error(e))
        }

        async fetchSubRooms(subjectId, allocationId) {
            await axios.get(`http://localhost:3001/api/allocation/${allocationId}/rooms/${subjectId}`)
            .then(data => this.subRooms = data.data)
            .catch(e => console.error(e))
         }
    }

    const resultRoomsStore = new ResultRoomsStore([]);
    export default resultRoomsStore;
