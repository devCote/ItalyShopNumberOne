import React from 'react';
import './form-input.scss';

const FormIput = ({ handleChange, label, ...otherProps }: any) => (
  <div className='group'>
    <input className='form-input' onChange={handleChange} {...otherProps} />
    {label ? (
      <label
        className={`${otherProps.value.length ? 'shrink' : ''}
         form-input-label`}
      >
        {label}
      </label>
    ) : null}
  </div>
);

export default FormIput;
