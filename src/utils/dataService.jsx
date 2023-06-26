import axios from "axios";

const axiosDataClient = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "https://localhost:7207/api/TodoApi",
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    }
});

export {
    axiosDataClient
}