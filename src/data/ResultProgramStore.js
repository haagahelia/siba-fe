import axios from 'axios'

        class ResultProgramStore {
            
            getNames() {
                return this.names ? this.names : [];
            }

            async fetchNames(id){
                await axios.get(`http://localhost:3001/api/allocation/${id}/program/`)
                .then(data => this.names = data.data)
                .catch(e => console.error(e))
            }

        }

        const resultProgramStore = new ResultProgramStore();
        export default resultProgramStore;