import React from 'react';
import { ITask } from '../interfaces';

interface Props {
  task: ITask;
  completeTask(taskNameToToggle: string): void;
  deleteTask(taskNameToDel: string): void;
}

export const TodoTask: React.FC<Props> = ({ task, completeTask, deleteTask }) => {
  const getFontSize = (length: number) => {
    if (length <= 15) return '24px';
    if (length <= 30) return '20px';
    return '16px';
  };

  return (
    <div className={`OneTaskCover ${task.isCompleted ? 'completed' : ''}`}>
      <div className='task'>
        <div className='content' onClick={() => completeTask(task.taskName)}>
          <span style={{ fontSize: getFontSize(task.taskName.length) }}>
            {task.taskName}
          </span>
          <span>
            {task.deadline === 1 ? `${task.deadline} day` : `${task.deadline} days`}
          </span>
        </div>
        <button onClick={() => deleteTask(task.taskName)}>
          <div className='trash'>🗑️</div>
        </button>
      </div>
    </div>
  );
};
