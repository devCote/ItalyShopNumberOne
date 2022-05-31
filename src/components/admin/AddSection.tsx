import React, { useRef, useState } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import { useHistory } from 'react-router-dom';
import AdminInput from './AdminInput';
import { createNewSection } from '../../firebase/create-new-section';

const AddSection = () => {
  const [imageUrl, setImageUrl]: any = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('TEST');
  const [routeName, setRouteName] = useState('');
  const [progress, setProgress] = useState(null);
  const [status, setStatus] = useState(null);

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

  const onSubmit = () => {
    createNewSection({
      title,
      routeName,
      file,
      setStatus,
      setProgress
    });
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  return (
    <React.Fragment>
      {admin ? (
        <React.Fragment>
          <div className='admin_preview_container'>
            <div className='showcard_admin_row'>
              <div onClick={uploadFile} className='collection-item'>
                <div className='image'>
                  <img src={imageUrl} alt='' />
                </div>
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
                inputLabel={'Название раздела'}
                inputValue={title}
                setInput={setTitle}
              />
              <AdminInput
                inputLabel={'Путь англ'}
                inputValue={routeName}
                setInput={setRouteName}
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
              Отправить
            </CustomButton>
            <CustomButton
              onClick={() => history.push('/')}
              className='control_btn'
              type='button'
            >
              Вернуться
            </CustomButton>
          </div>
          <div className='admin_status_container'>
            {status && progress ? (
              <div className='upload_status'>
                <p className='status'>{status}</p>
                {progress !== '100' ? (
                  <p className='percentage'>{progress}%</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default AddSection;
