import React from 'react';
import ReactDOM from 'react-dom';
import CustomButton from '../custom-button/custom-button';
import './Modal.scss';

const Modal = ({ title, body, submit, cancel, onDismiss, onSubmit }: any) => {
  const portal = document.querySelector('#modal');

  //const btnClass = () => {
  //if (negative) return 'modal_btn_negative';
  //else if (primary) return 'modal_btn_primary';
  //else return 'modal_btn';
  //};

  return portal
    ? ReactDOM.createPortal(
        <div onClick={onDismiss} className='modal_dimmer'>
          <div className='modal_window_container'>
            <div onClick={(e) => e.stopPropagation()} className='modal_window'>
              <div className='modal_header'>{title}</div>
              <div className='modal_content'>{body}</div>
              <div className='modal_actions'>
                <CustomButton
                  onClick={onSubmit}
                  className='modal_delete_button'
                >
                  {' '}
                  {submit}{' '}
                </CustomButton>
                <CustomButton onClick={onDismiss} className='button'>
                  {' '}
                  {cancel}{' '}
                </CustomButton>
              </div>
            </div>
          </div>
        </div>,
        portal
      )
    : null;
};

export default Modal;
