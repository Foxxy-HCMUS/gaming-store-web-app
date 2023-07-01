import axios from "axios";
export default axios.create({
    baseURL: "https://localhost:8080",
    headers: {
        "Content-type": "application/json",
        'Access-Control-Allow-Origin': 'http://localhost:8081',
        'Access-Control-Allow-Credentials': true
    },
    
})