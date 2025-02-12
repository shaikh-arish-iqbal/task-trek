import { useEffect, useState, useRef } from "react";
import todo_icon from "../assets/todo_icon_alter.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const [isTeacher, setIsTeacher] = useState(false); // Toggle between teacher and student
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const dueDateRef = useRef();
  const submissionDateRef = useRef();

  const handleLogin = () => {
    if (password === "teacher123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
    setPassword("");
  };

  const addTask = () => {
    const text = inputRef.current.value.trim();
    const dueDate = dueDateRef.current.value;
    const submissionDate = submissionDateRef.current.value;

    if (text === "" || !dueDate || !submissionDate) return;

    const newTask = {
      id: Date.now(),
      text,
      dueDate,
      submissionDate,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTask]);
    inputRef.current.value = "";
    dueDateRef.current.value = "";
    submissionDateRef.current.value = "";
  };

  const deleteTask = (id) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl">
      {/************* Title **********/}
      <div className="flex items-center mt-4 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-white text-3xl font-semibold">Task - Trek</h1>
      </div>

      {/************* Tabs for Teacher and Student **********/}
      <div className="flex bg-stone-900 mt-4">
        <button
          onClick={() => {
            setIsTeacher(true);
            setIsAuthenticated(false);
          }}
          className={`flex-1 py-3 text-center text-white font-medium transition-all duration-300 ${
            isTeacher ? "bg-yellow-400 text-black" : "bg-stone-800"
          }`}
        >
          Teacher
        </button>
        <button
          onClick={() => setIsTeacher(false)}
          className={`flex-1 py-3 text-center text-white font-medium transition-all duration-300 ${
            !isTeacher ? "bg-yellow-400 text-black" : "bg-stone-800"
          }`}
        >
          Student
        </button>
      </div>

      {/************* Teacher Authentication **********/}
      {isTeacher && !isAuthenticated && (
        <div className="my-5 bg-gray-200 p-3 rounded-lg flex flex-col gap-2">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-2 rounded w-full"
            placeholder="Enter Teacher Password"
          />
          <button
            onClick={handleLogin}
            className="bg-yellow-400 px-4 py-2 rounded text-black font-medium mt-2"
          >
            Login
          </button>
        </div>
      )}

      {/************* Teacher Section **********/}
      {isTeacher && isAuthenticated && (
        <div className="my-5 bg-gray-200 p-3 rounded-lg flex flex-col gap-2">
          <input
            ref={inputRef}
            className="bg-white p-2 rounded w-full"
            type="text"
            placeholder="Task Title"
          />
          <input
            ref={submissionDateRef}
            className="bg-white p-2 rounded w-full"
            type="date"
            placeholder="Submission Date"
          />
          <input
            ref={dueDateRef}
            className="bg-white p-2 rounded w-full"
            type="date"
            placeholder="Due Date"
          />
          <button
            onClick={addTask}
            className="bg-yellow-400 px-4 py-2 rounded text-black font-medium mt-2"
          >
            ADD TASK +
          </button>
        </div>
      )}

      {/************* Task List (Student & Teacher) **********/}
      <div>
        {todoList.map((task, index) => (
          <TodoItems
            key={index}
            text={task.text}
            id={task.id}
            isComplete={task.isComplete}
            dueDate={task.dueDate}
            submissionDate={task.submissionDate}
            deleteTodo={isTeacher && isAuthenticated ? deleteTask : null} // Only teachers can delete
            toggle={!isTeacher ? toggleTask : null} // Only students can check/uncheck
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
