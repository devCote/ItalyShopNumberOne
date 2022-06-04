import React, { useRef, useState, useEffect } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import { useHistory } from 'react-router-dom';
import AdminInput from './AdminInput';
import { createNewSection } from '../../firebase/section.create';

const AddSection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState();

  const admin = useSelector(selectAdminMode);
  const history = useHistory();
  const uploadRef: any = useRef();


  const uploadHandler = (e: any) => {
    setFile(e.target.files[0]);

    let reader: any = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (status === 'Success')
      setInterval(() => {
        history.push('/')
        window.location.reload()
      }, 1000)
  }, [status, history])

  const onSubmit = () => {
    createNewSection(
      title,
      url,
      file,
      setStatus,
    );
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  if (!admin) return <h1>Admin mode is off</h1>;

  return (
    <React.Fragment>
      <div className='admin_preview_container'>
        <div className='showcard_admin_row'>
          <div onClick={uploadFile} className='collection-item'>
            <img className='image' src={imageUrl} alt='' />
            <div className='content-text'>
              <div className='header-text'>{title}</div>
            </div>
          </div>
          <input
            className='upload_btn'
            type='file'
            name='sectionImg'
            onChange={uploadHandler}
            ref={uploadRef}
          />
        </div>
        <div className='admin_input_container'>
          <AdminInput
            inputLabel={'Section Title'}
            inputValue={title}
            setInput={setTitle}
          />
          <AdminInput
            inputLabel={'Route Name'}
            inputValue={url}
            setInput={setUrl}
          />
        </div>
      </div>
      <div className='admin_btn_container'>
        <CustomButton
          onClick={onSubmit}
          className='control_btn'
          type='button'
          apply
        >
          Apply
        </CustomButton>
        <CustomButton
          onClick={() => history.push('/')}
          className='control_btn'
          type='button'
        >
          Cansel
        </CustomButton>
      </div>
      <div className='admin_status_container'>
        {status && (
          <div className='upload_status'>
            <p className='status'>{status}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddSection;
