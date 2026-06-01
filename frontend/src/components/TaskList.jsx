export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-5xl sm:text-6xl mb-4">📝</div>
        <p className="text-gray-400 font-semibold text-base sm:text-lg">
          No tasks yet. Create one to get started! 🚀
        </p>
      </div>
    );
  }
  return (
    <>
      <ul className="space-y-3 sm:space-y-4 list-none">
        {tasks.map((task, index) => (
          <li
            key={task._id}
            className={`group bg-linear-to-r from-gray-700/40 to-gray-600/20 border-2 border-gray-600/50 hover:border-orange-500/50 rounded-xl p-4 sm:p-5 transition-all duration-300 transform hover:scale-102 hover:shadow-lg hover:shadow-orange-500/20 animate-slideUp ${
              task.completed
                ? "opacity-60 bg-linear-to-r from-green-900/20 to-gray-600/20"
                : "opacity-100"
            }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              {/* Task Content */}
              <div className="flex-1 min-w-0">
                <h3
                  onClick={() => onToggle(task)}
                  className={`cursor-pointer font-bold mb-2 transition-all duration-200 text-sm sm:text-base wrap-break-word ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-gray-100 group-hover:text-orange-300"
                  }`}
                >
                  {task.title}
                </h3>
                <p
                  className={`text-xs sm:text-sm transition-all duration-200 wrap-break-word ${
                    task.completed
                      ? "text-gray-500"
                      : "text-gray-300 group-hover:text-gray-200"
                  }`}
                >
                  {task.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={() => onToggle(task)}
                  className={`px-4 py-2 sm:px-5 sm:py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 whitespace-nowrap ${
                    task.completed
                      ? "bg-green-600/40 text-green-300 hover:bg-green-600/60 border border-green-600/50"
                      : "bg-green-600/20 text-green-300 hover:bg-green-600/40 border-2 border-green-600/40 hover:border-green-500/60"
                  }`}
                >
                  {task.completed ? "✓ Done" : "✓ Complete"}
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="px-4 py-2 sm:px-5 sm:py-2 bg-red-600/20 text-red-300 border-2 border-red-600/40 hover:border-red-500/60 rounded-lg text-xs sm:text-sm font-bold hover:bg-red-600/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
