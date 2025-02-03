import todo_icon from "../assets/todo_icon_alter.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  return (
    <div className="bg-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl">
      {/************* Title **********/}

      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-white text-3xl font-semibold">To-Do List</h1>
      </div>

      {/************* input box **********/}

      <div className="flex items-center my-7 bg-gray-200 p-2 rounded-full">
        <input
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button className="border-none rounded-full bg-yellow-400 w-32 h-14 text-white text-lg font-medium cursor-pointer shadow-xl">
          ADD +
        </button>
      </div>

      {/************* todo list **********/}

      <div>
        <TodoItems text="Learn Coding" />
        <TodoItems text="Learn Coding with Arish" />
      </div>
    </div>
  );
};

export default Todo;
