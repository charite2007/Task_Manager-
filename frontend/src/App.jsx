import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask,
} from "./api/task.api.js";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import EditModal from "./components/EditModal.jsx";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const { data } = await getTasks();
      setTasks(data.data);
    } catch (error) {
      setError(`Error getting the tasks ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (taskData) => {
    try {
      const { data } = await createTask(taskData);
      setTasks((task) => [...task, data.data]);
    } catch (error) {
      setError(`Error creating the Task ${error}`);
    }
  };

  const handleToggle = async (task) => {
    try {
      const { data } = await updateTask(task._id, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === data.data._id ? data.data : t)));
    } catch (error) {
      setError(`Failed to update the task ${error}`);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const { data } = await updateTask(editingTask._id, updatedData);
      setTasks(tasks.map((t) => (t._id === data.data._id ? data.data : t)));
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      setError(`Error updating the task ${error}`);
    }
  };

  const handelDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      setError(`Error deleting the task ${error}`);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-700 border-t-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg">Loading tasks...</p>
        </div>
      </div>
    );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900">
        {/* Header */}
        <div className="sticky top-0 z-40 backdrop-blur-lg bg-gray-900/50 border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg animate-fadeIn">
                Task Manager
              </h1>
              <p className="text-center text-gray-400 text-sm sm:text-base md:text-lg">
                Stay organized and productive
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          {/* Error Message */}
          {error && (
            <div className="mb-6 animate-slideDown">
              <p className="text-orange-300 font-medium p-4 bg-gradient-to-r from-orange-900/30 to-orange-800/20 border border-orange-500/40 rounded-xl shadow-lg backdrop-blur">
                ⚠️ {error}
              </p>
            </div>
          )}

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Task Form - Sidebar on larger screens */}
            <div
              className="lg:col-span-1 animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="sticky top-28 lg:top-32 bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-orange-500/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
                    Create Task
                  </h2>
                </div>
                <TaskForm onAdd={handleAdd} />
              </div>
            </div>

            {/* Task List - Main content */}
            <div
              className="lg:col-span-2 animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-8 bg-gradient-to-b from-orange-400 to-orange-600 rounded-full"></div>
                  <h2 className="text-xl sm:text-2xl font-bold text-orange-400">
                    Your Tasks
                  </h2>
                  <span className="ml-auto text-sm sm:text-base font-semibold text-gray-400 bg-gray-700/50 px-3 sm:px-4 py-1 sm:py-2 rounded-full">
                    {tasks.length}
                  </span>
                </div>
                <TaskList
                  tasks={tasks}
                  onToggle={handleToggle}
                  onDelete={handelDelete}
                  onEdit={handleEdit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        task={editingTask}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveEdit}
      />
    </>
  );
}
