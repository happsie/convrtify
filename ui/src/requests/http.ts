import axios from 'axios'; 

const HttpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASEURL,
}); 

export default HttpClient;