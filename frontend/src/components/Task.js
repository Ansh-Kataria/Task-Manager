import React, { useEffect, useState } from 'react';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: '' });
  const [selectedTask, setSelectedTask] = useState(null);
  const [editedTask, setEditedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);


  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/tasks');
      if (!response.ok) throw new Error('Error fetching tasks');
      const data = await response.json();
      console.log(data)
      setTasks(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newTask, completed: false }),
      });
      if (!response.ok) throw new Error('Error creating task');
      const createdTask = await response.json();
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setNewTask({ title: '', description: '', dueDate: '', priority: '' });
    } catch (error) {
      setError(error.message);
    }
  };

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  const closeFormModal = () => {
    setIsFormModalOpen(false);
  };


  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error deleting task');
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (task) => {
    setSelectedTask(task);
    setEditedTask({ ...task });
    setIsEditing(false);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setEditedTask(null);
    setIsEditing(false);
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const saveTask = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${selectedTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });
      if (!response.ok) throw new Error('Error updating task');
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === selectedTask._id ? updatedTask : task))
      );
      closeModal();
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleCompletion = async (task) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${task._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      if (!response.ok) throw new Error('Error updating task completion');
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t._id === task._id ? updatedTask : t))
      );
    } catch (error) {
      setError(error.message);
    }
  };




  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <h1 style={{ color: '#333', textAlign: 'center' }}>Task List</h1> */}
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

      <div style={{ textAlign: 'center' }}>
        <button onClick={openFormModal} style={{ padding: '10px 20px', margin: '20px 0', cursor: 'pointer' }}>
          Create Task
        </button>

        {isFormModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000

          }}>
            <div style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '400px',
              textAlign: 'center',
            }}>
              <h2>Add New Task</h2>
              <form onSubmit={createTask} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleInputChange}
                    placeholder="Task Title"
                    required
                    maxLength="20"
                    style={{ padding: '8px', marginBottom: '10px', width: '50%' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
                    Task Description
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    value={newTask.description}
                    onChange={handleInputChange}
                    placeholder="Task Description"
                    required
                    style={{ padding: '8px', marginBottom: '10px', width: '50%' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
                    Due Date
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    required
                    min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                    max="2025-12-31"
                    style={{ padding: '8px', marginBottom: '10px', width: '50%' }}
                  />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
                    Priority
                  </label>
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                    required
                    style={{ padding: '8px', marginBottom: '10px', width: '50%' }}
                  >
                    <option value="" disabled>Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>


                <button type="submit" style={{ padding: '8px 16px', cursor: 'pointer' }}>
                  Add Task
                </button>
                <button onClick={closeFormModal} style={{ padding: '8px 16px', cursor: 'pointer', marginLeft: '10px' }}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      <ul style={{ padding: '0', listStyleType: 'none' }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li
              key={task._id}
              style={{
                backgroundColor: task.completed ? '#e0ffe0' : '#f4f4f4',
                border: '1px solid #ddd',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '5px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                position: 'relative',
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              <h3 style={{ margin: '0', color: '#555' }}>{task.title}</h3>
              <p style={{ margin: '5px 0', color: '#777' }}>{task.description}</p>
              <button onClick={() => openModal(task)} style={{ padding: '5px 10px', marginRight: '10px' }}>
                View Details
              </button>

              <button
                onClick={() => toggleCompletion(task)}
                style={{
                  padding: '5px 10px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  backgroundColor: task.completed ? '#4CAF50' : '#FF9800',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                }}
              >
                {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
              </button>
              <button onClick={() => deleteTask(task._id)} style={{ padding: '5px 10px', color: 'red' }}>
                Delete
              </button>
            </li>
          ))
        ) : (
          <p>No tasks found.</p>
        )}
      </ul>

      {selectedTask && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            zIndex: 1000,
          }}
        >
          {isEditing ? (
            <>
              <h2>Edit Task</h2>
              <div style={{
                display:'flex',
                alignItems:'center',
                gap:'10px'
              }}>
                <input
                  type="text"
                  name="title"
                  value={editedTask.title}
                  onChange={handleEditChange}
                  maxLength="20"
                  style={{ marginBottom: '10px', padding: '8px' }}
                />
                <textarea
                  name="description"
                  value={editedTask.description}
                  onChange={handleEditChange}
                  
                  rows={1}
                  style={{ marginBottom: '10px', padding: '8px' }}
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate}
                  onChange={handleEditChange}
                  min={new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0]}
                  max="2025-12-31"
                  style={{ marginBottom: '10px', padding: '8px' }}
                />
                <select
                  name="priority"
                  value={editedTask.priority}
                  onChange={handleEditChange}
                  style={{ marginBottom: '10px', padding: '8px' }}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <button onClick={saveTask} style={{ padding: '10px 20px', marginRight: '5px' }}>
                  Save
                </button>
                <button onClick={closeModal} style={{ padding: '10px 20px' }}>
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div style={{

            }}>
              <h2>{selectedTask.title}</h2>
              <p>{selectedTask.description}</p>
              <p>Due Date: {new Date(selectedTask.dueDate).toLocaleDateString()}</p>
              <p>Priority: {selectedTask.priority}</p>
              <p>Status: {selectedTask.completed ? "completed" : "pending"}</p>
              <button disabled={selectedTask.completed} onClick={startEditing} style={{ padding: '10px 20px', marginRight: '5px' }}>
                Edit
              </button>
              <button onClick={closeModal} style={{ padding: '10px 20px' }}>
                Close
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Task;
