import React from 'react';

const CustomAlerts = ({ hideAlert }: { hideAlert: () => void }) => {
  return (
    <div className='alert'>
      <div className='alert-container alert-caution'>
        <div className='alert-header'>
          <span className='alert-message'>Please, enter different task</span>
          <span className='btn btn-close' onClick={hideAlert}>x</span>
        </div>
      </div>
    </div>
  );
};

export default CustomAlerts;
