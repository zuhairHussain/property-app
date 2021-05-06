import axios from "axios";
const  BASE_URL = 'https://api.github.com';

export default {
    fetchAllGists: async (username) => {
        try{
            const response = await axios.get(`${BASE_URL}/users/${username}/gists`);
            return response.data;
        } catch(err){
            throw err;
        }
    },
    fetchForkList: async (id) => {
        try{
            const response = await axios.get(`${BASE_URL}/gists/${id}/forks`);
            return response.data;
        } catch(err){
            throw err;
        }
    }
}