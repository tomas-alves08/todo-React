import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { deleteTodo, getTodos } from "./utils/todoService";

function App() {
  const [todos, setTodos] = useState([]);

  const handleDelete = async (id) => {
    const deletedTodo = await deleteTodo(id);
    return deletedTodo;
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const todoList = await getTodos();
      setTodos(todoList?.data);
      console.log(todoList);
    };
    fetchTodos();
  }, [todos]);
  return (
    <div className="App">
      <h1>Tomas' Todos</h1>
      {todos &&
        todos?.map((todo, idx) => {
          return (
            <ListGroup>
              <ListGroup.Item variant="primary" className="todo-container">
                <div className="ms-auto me-auto">
                  <div className="fw-bold">
                    {idx + 1}. {todo.item}
                  </div>
                  {todo.description}
                </div>
                <div className="mt-2 mx-2 d-flex justify-content-between align-items-start">
                  <div className="mx-2" style={{ color: "blue" }}>
                    <FaPen />
                  </div>
                  <div
                    className="mx-2"
                    style={{ color: "red" }}
                    onClick={() => handleDelete(todo.id)}
                  >
                    <FaTrash />
                  </div>
                </div>
              </ListGroup.Item>
            </ListGroup>
          );
        })}
    </div>
  );
}

export default App;
