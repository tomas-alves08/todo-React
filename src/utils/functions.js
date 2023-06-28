import { deleteTodo, updateTodo } from "./todoService";

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

export { handleDelete, handleTodoCheck };
