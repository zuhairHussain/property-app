import axios from "axios";
const  BASE_URL = 'api/v1';

export default {
    login: async (user) => {
        try{
            const response = await axios.post(`${BASE_URL}/login`, user);
            return response.data;
        } catch(err){
            throw err;
        }
    }
}