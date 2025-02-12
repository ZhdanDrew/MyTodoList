import React, { useState, useEffect } from 'react';
import './App.css';
import { ITask } from './interfaces';
import { TodoTask } from './components/TodoTask';
import CustomAlerts from './components/CustomAlerts';

const App = () => {
  const [task, setTask] = useState<string>('');
  const [deadline, setDeadline] = useState<number>(0);
  const [todo, setTodo] = useState<ITask[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');
  const maxTaskLength = 46;

  useEffect(() => {
    const storedTodo = localStorage.getItem('todo');
    if (storedTodo) {
      const parsedTodo = JSON.parse(storedTodo);
      console.log('Загруженные задания:', parsedTodo);
      setTodo(parsedTodo);
    }
  }, []);

  useEffect(() => {
    console.log('Сохраняемые задания:', todo);
    localStorage.setItem('todo', JSON.stringify(todo));
  }, [todo]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    if (name === 'task') {
      if (value.length <= maxTaskLength) {
        setTask(value);
      }
    } else {
      setDeadline(Number(value));
    }
  };

  const addTask = (): void => {
    if (!task.trim()) {
      handleCreateAlert();
      return;
    }
    const newTask: ITask = { taskName: task, deadline: deadline, isCompleted: false };
    const taskExists = todo.some((t) => t.taskName === task);

    if (taskExists) {
      handleCreateAlert();
    } else {
      setTodo([...todo, newTask]);
      setTask('');
      setDeadline(0);
    }
  };

  const completeTask = (taskNameToToggle: string): void => {
    setTodo(
      todo.map((task) =>
        task.taskName === taskNameToToggle ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const deleteCompletedTasks = (): void => {
    setTodo(todo.filter((task) => !task.isCompleted));
  };

  const handleCreateAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      hideAlert();
    }, 4000);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

  const filteredTasks = () => {
    if (filter === 'completed') {
      return todo.filter((task) => task.isCompleted);
    } else if (filter === 'notCompleted') {
      return todo.filter((task) => !task.isCompleted);
    } else {
      return todo;
    }
  };

  const deleteTask = (taskNameToDel: string): void => {
    setTodo(todo.filter((task) => task.taskName !== taskNameToDel));
  };

  return (
    <div className='App'>
      <div className='header'>
        <div className='TitleContainer'>
          <div className='logo'>
            <svg enableBackground="new 0 0 48 48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <g fill="#3f51b5">
                <path d="m17.8 18.1-7.4 7.3-4.2-4.1-2.2 2.2 6.4 6.4 9.6-9.6z"/>
                <path d="m17.8 5.1-7.4 7.3-4.2-4.1-2.2 2.2 6.4 6.4 9.6-9.6z"/>
                <path d="m17.8 31.1-7.4 7.3-4.2-4.1-2.2 2.2 6.4 6.4 9.6-9.6z"/>
              </g>
              <g fill="#90caf9">
                <path d="m24 22h20v4h-20z"/>
                <path d="m24 9h20v4h-20z"/>
                <path d="m24 35h20v4h-20z"/>
              </g>
            </svg>
          </div>
          <div className='Title'>MyTodoList</div>
        </div>
        <div className='inputContainer'>
          <input
            type='text'
            placeholder='Task...'
            name='task'
            value={task}
            onChange={handleChange}
          />
          <input
            type='number'
            placeholder='Deadline (days)...'
            name='deadline'
            value={deadline}
            onChange={handleChange}
          />
          <button onClick={addTask}>Add Task</button>
          <div className='charCounter'>
            {task.length}/{maxTaskLength}
          </div>
        </div>
      </div>

      <div className='todoList'>
        <div className='taskCover'>
          <div className='myTasksCover'>
            <span className='myTasks'>My Tasks</span>
          </div>
          {filteredTasks().map((task: ITask, key: number) => (
            <TodoTask key={key} task={task} completeTask={completeTask} deleteTask={deleteTask} />
          ))}
        </div>
        <div className='btn-cover'>
            <div className='filterButtons'>
            <button onClick={() => setFilter('all')}>All Tasks</button>
            <button onClick={() => setFilter('completed')}>Completed Tasks</button>
            <button onClick={() => setFilter('notCompleted')}>Not Completed Tasks</button>
            <button onClick={deleteCompletedTasks}>Delete All Completed</button>
        </div>
        </div>
      </div>
      <div>
        {showAlert && <CustomAlerts hideAlert={hideAlert} />}
      </div>
    </div>
  );
};

export default App;
