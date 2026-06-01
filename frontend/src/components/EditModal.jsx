import { useState, useEffect } from "react";

export default function EditModal({ task, isOpen, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (task && isOpen) {
      setTitle(task.title);
      setDescription(task.description);
      setError("");
    }
  }, [task, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }

    onSave({
      title: title.trim(),
      description: description.trim(),
    });
    onClose();
  };

  if (!isOpen || !task) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-orange-500/30 rounded-2xl shadow-2xl max-w-lg w-full animate-slideUp">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 sm:p-8 border-b border-gray-700/50">
            <h3 className="text-2xl sm:text-3xl font-bold text-orange-400">
              ✏️ Edit Task
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 text-2xl transition"
            >
              ✕
            </button>
          </div>

          {/* Modal Body */}
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
            {/* Title Input */}
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

            {/* Description Input */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Task Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task details..."
                className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-700/50 border-2 border-gray-600 hover:border-orange-500/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all duration-300 resize-none h-20 sm:h-24 text-sm sm:text-base"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-orange-400 font-semibold text-xs sm:text-sm bg-orange-900/30 p-3 rounded-lg border border-orange-500/30 animate-shake">
                ⚠️ {error}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 sm:py-4 bg-gray-700/50 hover:bg-gray-600/50 text-gray-200 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50 active:scale-95 text-sm sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
