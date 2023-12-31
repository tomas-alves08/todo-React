import { axiosDataClient } from "./dataService";

const getTodos = async () => axiosDataClient.get("/");

const deleteTodo = async (id) => axiosDataClient.delete(`/id:int?id=${id}`)

const updateTodo = async (id, data) => axiosDataClient.put(`/id:int?id=${id}`, data)

const createTodo = async (data) => axiosDataClient.post("/",data)


export {
    getTodos,
    deleteTodo,
    updateTodo,
    createTodo
}