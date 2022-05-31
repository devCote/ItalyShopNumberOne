import React from 'react';

const AdminInput = ({ inputLabel, inputValue, setInput }: any) => {
  return (
    <React.Fragment>
      <p className='admin_label'>{inputLabel}</p>
      <input
        type='input'
        value={inputValue}
        onChange={(e) => setInput(e.target.value)}
        className='admin_input'
      />
    </React.Fragment>
  );
};

export default AdminInput;
