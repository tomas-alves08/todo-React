import { axiosDataClient } from "./dataService";

const getTodos = async () => axiosDataClient.get("/");

const deleteTodo = async (id) => axiosDataClient.delete(`/id:int?id=${id}`)

export {
    getTodos,
    deleteTodo
}