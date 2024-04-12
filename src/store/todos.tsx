import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
export type TodosProviderProps = {
  children: ReactNode;
};
export type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};
export type TodosContext = {
  todos: Todo[];
  handleAddToDo: (task: string) => void;
  toggleTodoCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
  handleEditTodo: (id: string, newTask: string) => void;
};
export const todosContext = createContext<TodosContext | null>(null);

export const TodosProvideer = ({ children }: TodosProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newtodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newtodos) as Todo[];
    } catch (error) {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  const handleAddToDo = (task: string) => {
    setTodos((prev) => {
      const newTodos: Todo[] = [
        {
          id: Math.random().toString(),
          task: task,
          completed: false,
          createdAt: new Date(),
        },
        ...prev,
      ];
      //   console.log(prev);
      //   console.log(newTodos);
      localStorage.setItem("todos", JSON.stringify(newTodos));
      return newTodos;
    });
  };
  const handleEditTodo = (id: string, newTask: string) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
    );
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const toggleTodoCompleted = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => {
      let newTodos = prev.filter((filterTodo) => filterTodo.id != id);
      return newTodos;
    });
  };

  return (
    <todosContext.Provider
      value={{
        todos,
        handleAddToDo,
        toggleTodoCompleted,
        handleDeleteTodo,
        handleEditTodo,
      }}
    >
      {children}
    </todosContext.Provider>
  );
};

export const useTodos = () => {
  const todosConsumer = useContext(todosContext);
  if (!todosConsumer) {
    throw new Error("useTodos used outside of Provider");
  }
  return todosConsumer;
};
