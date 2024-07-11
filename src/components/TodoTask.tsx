import React from 'react';
import { ITask } from '../interfaces';

interface Props {
  task: ITask;
  completeTask(taskNameToDel: string): void;
}

export const TodoTask: React.FC<Props> = ({ task, completeTask }) => {
  return (
    <div className='OneTaskCover'>
      <div className='task'>
        <div className='content'>
          <span>{task.taskName}</span>
          <span>{task.deadline === 1 ? `${task.deadline} day` : `${task.deadline} days`}</span>
        </div>
        <button onClick={() => completeTask(task.taskName)}>
          <div className='trash'>🗑️</div>
        </button>
      </div>
    </div>
  );
};
