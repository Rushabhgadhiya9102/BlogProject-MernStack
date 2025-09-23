import axios from "axios";

const apiInstance = axios.create({
    baseURL: "https://blogproject-mernstack-2.onrender.com",
    withCredentials: true 
})

export default apiInstance