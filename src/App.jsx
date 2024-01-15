import React, { useState, useEffect } from 'react';
import './App.css';

const TodoList = () => {
  const initialTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== '') {
      if (editId !== null) {
        const updatedTasks = tasks.map((task) => (task.id === editId ? { ...task, text: newTask } : task));
        setTasks(updatedTasks);
        setEditId(null);
      } else {
        setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      }
      setNewTask('');
    }
  };

  const handleEditTask = (id) => {
    setEditId(id);
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit.text);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    setEditId(null);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2 className='header'>Todo List</h2>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Enter a new task"
        />
        <button className='btn' onClick={handleAddTask}>
          {editId !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            {task.text}
            <div className="button">
              <button className='btn' onClick={() => handleEditTask(task.id)}>
                Edit
              </button>
              <button className='btn btn-danger' onClick={() => handleDeleteTask(task.id)}>
                Delete
              </button>
              <button className='btn btn-complete' onClick={() => handleCompleteTask(task.id)}>
                {task.completed ? 'Uncomplete' : 'Complete'}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
