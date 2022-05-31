import React, { useRef, useState, useEffect } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import { useHistory } from 'react-router-dom';
import AdminInput from './AdminInput';
import { createNewSection } from '../../firebase/create-new-section';

const AddSection = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [engTitle, setEngTitle] = useState('');
  const [progress, setProgress] = useState();

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
    if (progress === 'Загрузка завершена успешно')
      setInterval(() => {
        history.push('/')
        window.location.reload()
      }, 1000)
  }, [progress, history])

  const onSubmit = () => {
    createNewSection({
      title,
      file,
      engTitle,
      setProgress,
    });
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  return (
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
            inputLabel={'Название англ'}
            inputValue={engTitle}
            setInput={setEngTitle}
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
        {progress && (
          <div className='upload_status'>
            <p className='status'>{progress}</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddSection;
