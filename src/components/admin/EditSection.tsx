import React, { useState, useRef, useEffect } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import {
  selectCurrentSection,
  selectIsDirectoryLoaded,
} from '../../redux/directory/directory.selectors';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AdminInput from './AdminInput';
import NewSpinner from '../new-spinner/NewSpinner';
import { updateSection } from '../../firebase/section.update';

const EditSectionOrCollection = () => {
  const isLoaded = useSelector(selectIsDirectoryLoaded);
  const admin = useSelector(selectAdminMode);
  const match: any = useRouteMatch();
  const history = useHistory();
  const sectionName = match.params.sectionName
  const currentSection = useSelector(selectCurrentSection(sectionName));

  const [file, setFile]: any = useState(null);
  const [title, setTitle] = useState(currentSection[0]?.title)
  const [imageUrl, setImageUrl] = useState(currentSection[0].imageUrl);
  const [engTitle, setEngTitle] = useState(currentSection[0]?.engTitle);
  const [status, setStatus] = useState('');

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
    if (status === 'Загрузка завершена успешно')
      setInterval(() => {
        window.location.replace('/');
      }, 1000)
  }, [status])


  const onSubmit = () => {
    const { id, storageRef } = currentSection[0]
    updateSection(id, title, engTitle, file, storageRef, setStatus)
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  return (
    <React.Fragment>
      {isLoaded && admin ? (
        <React.Fragment>
          <div className='admin_preview_container'>
            <div className='showcard_admin_row'>
              <div onClick={uploadFile} className='collection-item'>
                <img className="image" src={imageUrl} alt='' />
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
              Обновить
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
            {status && (
              <div className='upload_status'>
                <p className='status'>{status}</p>
              </div>
            )}
          </div>
        </React.Fragment>
      ) : (
        <NewSpinner />
      )}
    </React.Fragment>
  );
};

export default EditSectionOrCollection;
