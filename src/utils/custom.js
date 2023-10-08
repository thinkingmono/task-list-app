import axios from "axios";

const authFetch = axios.create({
    baseURL: 'http://localhost:5000/api/tasks'
})

export default authFetch;