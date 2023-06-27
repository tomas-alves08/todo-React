import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FaPen, FaTrash } from "react-icons/fa";
import { deleteTodo, getTodos, updateTodo } from "./utils/todoService";

function App() {
  const [todos, setTodos] = useState([]);

  const handleDelete = async (id) => {
    const deletedTodo = await deleteTodo(id);
    return deletedTodo;
  };

  const handleTodoCheck = async (idx, todo) => {
    const updatedTodo = {
      id: todo.id,
      description: todo.description,
      dueDate: todo.dueDate,
      item: todo.item,
      dateComplete: new Date().toISOString(),
      isCompleted: !todo.isCompleted,
    };

    await updateTodo(idx, updatedTodo);
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todoList = await getTodos();
        setTodos(todoList);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTodos();
  }, [todos]);

  return (
    <div className="App">
      <h1>Todos</h1>
      {todos &&
        todos?.data?.map((todo, idx) => {
          const dateComplete = todo.dateComplete.toString().slice(0, 10);
          const dueDate = todo.dueDate.toString().slice(0, 10);

          return (
            <ListGroup>
              <div className="todo-group-item">
                <ListGroup.Item
                  className="todo-check"
                  variant={todo.isCompleted ? "success" : "primary"}
                >
                  <Form>
                    <div className="mt-2 mx-2" style={{ border: "black" }}>
                      <Form.Check
                        type="checkbox"
                        id={idx}
                        checked={todo.isCompleted ? true : false}
                        onChange={() => handleTodoCheck(todo.id, todo)}
                      />
                    </div>
                  </Form>
                </ListGroup.Item>

                <ListGroup.Item
                  className={
                    todo.isCompleted
                      ? "todo-container-cross-line"
                      : "todo-container"
                  }
                  variant={todo.isCompleted ? "success" : "primary"}
                >
                  <div className="ms-auto me-auto">
                    <div className="fw-bold">
                      {idx + 1}. {todo.item}
                    </div>
                    <span style={{ fontSize: "small" }}>
                      {todo.description}
                    </span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="todo-dueDate"
                  variant={todo.isCompleted ? "success" : "primary"}
                >
                  <div>
                    <div className="fw-bold">Due Date</div>
                    <span style={{ fontSize: "small" }}>{dueDate}</span>
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="todo-status"
                  variant={todo.isCompleted ? "success" : "primary"}
                >
                  <div>
                    <div className="fw-bold">Status</div>
                    {todo.isCompleted ? (
                      <span style={{ fontSize: "small" }}>
                        Completed on{" "}
                        <span className="fw-bold">{dateComplete}</span>
                      </span>
                    ) : (
                      <span style={{ fontSize: "small" }}>Not Completed!</span>
                    )}
                  </div>
                </ListGroup.Item>

                <ListGroup.Item
                  className="todo-icons"
                  variant={todo.isCompleted ? "success" : "primary"}
                >
                  <div className="mt-2 mx-2 d-flex justify-content-between align-items-start">
                    <div className="mx-2" style={{ color: "blue" }}>
                      <FaPen />
                    </div>
                    <div
                      className="me-1"
                      style={{ color: "red" }}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <FaTrash />
                    </div>
                  </div>
                </ListGroup.Item>
              </div>
            </ListGroup>
          );
        })}
    </div>
  );
}

export default App;
