import AddToDo from"./components/addToDo"
import Navbar from "./components/navbar";
import Todos from "./components/todos";
import "./App.css"
const App = () => {
  return (
    <main className="hero_section">
      <h1>TaskTrend: Revolutionizing To-Dos</h1>
      <Navbar/>
      <AddToDo/>
      <Todos/>
    </main>
  );
};

export default App;
