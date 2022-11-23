import axios from "axios";
import resultRoomsStore from "./ResultRoomsStore";
import resultProgramStore from "./ResultProgramStore";

class AllocationPost {

    startAlloc(){
    axios.post('http://localhost:3001/api/allocation/start', {
        allocRound : 10004
})
.then(function(response){
    console.log(response);
})
.then(() => {resultRoomsStore.fetchRooms(10004)
resultProgramStore.fetchNames(10004)
})

.catch(function(error){
    console.log(error);
})
}

    resetAlloc(){
    axios.post('http://localhost:3001/api/allocation/reset', {
        allocRound : 10004
    })
    .then(function(response){
        console.log(response);
    })
    .catch(function(error){
        console.log(error);
    })
}

}

const allocationPost = new AllocationPost();
export default allocationPost;

