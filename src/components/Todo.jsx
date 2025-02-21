import { db } from "../firebaseConfig"; // Import Firestore
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState, useRef } from "react";
import todo_icon from "../assets/todo_icon_alter.png";
import TodoItems from "./TodoItems";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const inputRef = useRef();
  const dueDateRef = useRef();
  const submissionDateRef = useRef();

  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch tasks from Firestore
  const fetchTasks = async () => {
    const querySnapshot = await getDocs(collection(db, "tasks"));
    setTodoList(
      querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    );
  };

  // Add a task to Firestore
  const addTask = async () => {
    const text = inputRef.current.value.trim();
    const dueDate = dueDateRef.current.value;
    const submissionDate = submissionDateRef.current.value;

    if (text === "" || !dueDate || !submissionDate) return;

    const newTask = {
      text,
      dueDate,
      submissionDate,
      isComplete: false,
    };

    const docRef = await addDoc(collection(db, "tasks"), newTask);
    setTodoList([...todoList, { id: docRef.id, ...newTask }]);

    inputRef.current.value = "";
    dueDateRef.current.value = "";
    submissionDateRef.current.value = "";
  };

  // Delete a task from Firestore
  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
    setTodoList(todoList.filter((task) => task.id !== id));
  };

  // Toggle task completion in Firestore
  const toggleTask = async (id, isComplete) => {
    await updateDoc(doc(db, "tasks", id), { isComplete: !isComplete });
    setTodoList(
      todoList.map((task) =>
        task.id === id ? { ...task, isComplete: !isComplete } : task
      )
    );
  };

  return (
    <div className="bg-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl">
      {/************* Title **********/}
      <div className="flex items-center mt-4 gap-2">
        <img className="w-8" src={todo_icon} alt="" />
        <h1 className="text-white text-3xl font-semibold">
          Task - Trek <span className="text-yellow-400">+</span>
        </h1>
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
            onClick={() =>
              password === "teacher123"
                ? setIsAuthenticated(true)
                : alert("Incorrect password!")
            }
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

      {/************* Task List **********/}
      <div>
        {todoList.map((task) => (
          <TodoItems
            key={task.id}
            text={task.text}
            id={task.id}
            isComplete={task.isComplete}
            dueDate={task.dueDate}
            submissionDate={task.submissionDate}
            deleteTodo={
              isTeacher && isAuthenticated ? () => deleteTask(task.id) : null
            }
            toggle={
              !isTeacher ? () => toggleTask(task.id, task.isComplete) : null
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
