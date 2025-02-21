import Todo from "./components/Todo";
import Header from "./Header";

const App = () => {
  return (
    <div className="bg-stone-900 grid py-4 min-h-screen">
      <Header />
      <Todo />
    </div>
  );
};

export default App;
