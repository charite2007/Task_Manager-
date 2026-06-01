import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    await onAdd({ title, description });
    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Task Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter task title..."
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-700/50 border-2 border-gray-600 hover:border-orange-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 text-sm sm:text-base"
          />
        </div>
        <div className="group">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Task Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add more details about your task..."
            className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-700/50 border-2 border-gray-600 hover:border-orange-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 resize-none h-20 sm:h-24 text-sm sm:text-base"
          />
        </div>
        {error && (
          <p className="text-orange-400 font-semibold text-xs sm:text-sm bg-orange-900/30 p-3 rounded-lg border border-orange-500/30 animate-shake">
            ⚠️ {error}
          </p>
        )}
        <button
          type="submit"
          className="w-full px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 shadow-lg active:scale-95 text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <span>✨</span>
          <span>Add Task</span>
        </button>
      </form>
    </>
  );
}
