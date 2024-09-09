'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PomodoroTimer from './PomodoroTimer';
import styles from '../style/TaskList.module.css';

interface Task {
  id: number;
  title: string;
  isCompleted: boolean;
  pomodoroCount: number;
  totalPomodoro: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    setTasks(savedTasks);
  }, []);

  const addTask = () => {
    if (newTaskTitle.trim() === '') return;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      isCompleted: false,
      pomodoroCount: 0,
      totalPomodoro: 4,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setNewTaskTitle('');
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleTimerComplete = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, pomodoroCount: task.pomodoroCount + 1 } 
          : task
      )
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🍅 Time Master 🍅</h1>
        <div className={styles.inputContainer}>
          <Input
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a task with"
          />
          <Button className={styles.button} onClick={addTask}>Add</Button>
        </div>
        <ul className={styles.taskList}>
          {tasks.map(task => (
            <li key={task.id} className={styles.taskItem}>
              <div className={styles.taskInfo}>
                <span className={styles.taskTitle}>{task.title}</span>
                <span className={styles.taskProgress}>
                  Progress: {task.pomodoroCount}/{task.totalPomodoro} Pomodoros
                </span>
              </div>
              <div className={styles.timerContainer}>
                <PomodoroTimer 
                  initialTime={25 * 60} 
                  onTimerComplete={() => handleTimerComplete(task.id)} 
                />
              </div>
              <Button className={styles.deleteButton} onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
