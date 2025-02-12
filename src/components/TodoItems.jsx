import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

const TodoItems = ({
  text,
  id,
  isComplete,
  dueDate,
  submissionDate,
  deleteTodo,
  toggle,
}) => {
  return (
    <div className="flex items-center justify-between bg-stone-800 p-4 rounded-lg shadow-md my-2">
      <div
        onClick={() => {
          if (toggle) toggle(id);
        }}
        className="flex items-center cursor-pointer"
      >
        <img className="w-6" src={isComplete ? tick : not_tick} alt="" />
        <div className="ml-4">
          <p
            className={`text-white text-lg ${isComplete ? "line-through" : ""}`}
          >
            {text}
          </p>
          <p className="text-yellow-400 text-sm">🎯 Due: {dueDate}</p>
          <p className="text-gray-400 text-sm">
            📅 Submission: {submissionDate}
          </p>
        </div>
      </div>
      {deleteTodo && (
        <img
          onClick={() => deleteTodo(id)}
          className="w-5 cursor-pointer hover:opacity-75"
          src={delete_icon}
          alt="Delete"
        />
      )}
    </div>
  );
};

export default TodoItems;
