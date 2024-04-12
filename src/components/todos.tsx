import { useState } from "react";
import { useTodos, Todo } from "../store/todos";
import { useSearchParams } from "react-router-dom";
const Todos = () => {
  const { todos, toggleTodoCompleted, handleDeleteTodo,handleEditTodo } =
    useTodos();

  const [searchParams] = useSearchParams();
  let todosData = searchParams.get("todos");
  const [editId, setEditId] = useState<string | null>(null); // State to track which task is being edited
  const [editedTask, setEditedTask] = useState<string>("");
  let filterData = todos;
  if (todosData == "active") {
    filterData = filterData.filter((task) => !task.completed);
  }
  if (todosData == "completed") {
    filterData = filterData.filter((task) => task.completed);
  }

  const handleEdit = (id: string, task: string) => {
    setEditId(id);
    setEditedTask(task);
  };

  const saveEditedTask = (id: string) => {
    if (editedTask.trim() !== "") {
      handleEditTodo(id, editedTask);
      setEditId(null);
    }
  };
  return (
    <ul className="taskList">
      {filterData.map((todo) => {
        return (
          
          <li key={todo.id}>
            <input
              type="checkbox"
              id={`todo-${todo.id}`}
              checked={todo.completed}
              onChange={() => toggleTodoCompleted(todo.id)}

            />
            {editId === todo.id ? (
            <>
              <input className="editForm"
                type="text"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
              <button onClick={() => saveEditedTask(todo.id)}>Save</button>
            </>
          ) : (
           
            <>
              <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
              <button onClick={() => handleEdit(todo.id, todo.task)}>Edit</button>
            </>
          )}
            {todo.completed && (
              <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                Delete
              </button>
              
            )}
            
          </li>
          
        );
      })}
    </ul>
  );
};

export default Todos;
