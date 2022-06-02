import React, { useEffect, useRef, useState } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AdminInput from './AdminInput';
import { createNewProduct } from '../../firebase/product.create';
import { selectCurrentSection } from '../../redux/directory/directory.selectors';

const AddCollection = () => {
  const [imageUrl, setImageUrl]: any = useState([]);
  const [file, setFile]: any = useState([]);
  const [status, setStatus] = useState(null);
  const [count, setCount] = useState(0);
  const [currentId, setCurrentId] = useState(0);

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState('');
  const [country, setCountry] = useState('');
  const [landing, setLanding] = useState('');
  const [style, setStyle] = useState('');
  const [color, setColor] = useState('');
  const [fabricType, setFabricType] = useState('');
  const [fabricSettings, setFabricSettings] = useState('');
  const [fastener, setFastener] = useState('');
  const [sizes, setSizes] = useState('');

  const uploadRef: any = useRef();
  const admin = useSelector(selectAdminMode);
  const history = useHistory();
  const match: any = useRouteMatch();
  const sectionName = match.params.sectionName
  const currentSection = useSelector(selectCurrentSection(sectionName))

  useEffect(() => {
    if (status === 'Загрузка завершена успешно')
      setTimeout(() => {
        window.location.replace(
          `/shop/${sectionName}`
        );
      }, 1000);
  }, [status, sectionName])

  const uploadHandler = (e: any) => {
    if (!file[currentId]) {
      setFile([...file, e.target.files[0]]);

      let reader: any = new FileReader();
      reader.onloadend = () => {
        setImageUrl([...imageUrl, reader.result]);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      const fArr = file.map((item: any, idx: number) =>
        idx === currentId ? e.target.files[0] : item
      );

      setFile(fArr);

      let reader: any = new FileReader();
      reader.onloadend = () => {
        const iArr = imageUrl.map((item: any, idx: number) =>
          idx === Number(currentId) ? reader.result : item
        );
        setImageUrl(iArr);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const uploadFile = () => {
    uploadRef.current.click();
  };

  const onUploadSubmit = async () => {
    const id = Math.round(Math.random() * 1000000000).toString();
    const product = {
      id, name, price, brand, country, landing, style,
      color, fabricType, fabricSettings, fastener, sizes
    }
    createNewProduct(
      product,
      currentSection[0].id,
      file,
      setStatus
    )
  };

  const handleImgChange = (e: any) => {
    setCurrentId(e.target.id);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setCurrentId(count + 1);
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  return (
    <React.Fragment>
      {admin ? (
        <React.Fragment>
          <div className='admin_preview_container'>
            <div className='showcard_admin_row'>
              <div onClick={uploadFile} className='collection-item'>
                <img
                  className='image'
                  src={!!imageUrl ? imageUrl[currentId] : null}
                  alt=''
                />
                <div className='content-text'>{name}</div>
                <input
                  className='upload_btn'
                  type='file'
                  name='sectionImg'
                  onChange={uploadHandler}
                  ref={uploadRef}
                />
              </div>
              <div className='admin_img_prew_container'>
                <img
                  id='0'
                  src={imageUrl[0] ? imageUrl[0] : null}
                  onClick={handleImgChange}
                  className='admin_img_prew'
                  alt=''
                />
                {count > 0 ? (
                  <img
                    id='1'
                    src={imageUrl[1] ? imageUrl[1] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 1 ? (
                  <img
                    id='2'
                    src={imageUrl[2] ? imageUrl[2] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 2 ? (
                  <img
                    id='3'
                    src={imageUrl[3] ? imageUrl[3] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 3 ? (
                  <img
                    id='4'
                    src={imageUrl[4] ? imageUrl[4] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 4 ? (
                  <img
                    id='5'
                    src={imageUrl[5] ? imageUrl[5] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 5 ? (
                  <img
                    id='6'
                    src={imageUrl[6] ? imageUrl[6] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count > 6 ? (
                  <img
                    id='7'
                    src={imageUrl[7] ? imageUrl[7] : null}
                    onClick={handleImgChange}
                    className='admin_img_prew'
                    alt=''
                  />
                ) : null}
                {count < 3 ? (
                  <div onClick={handleIncrement} className='admin_img_prew'>
                    <div className='admin_plus'>+</div>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='admin_input_container'>
              <AdminInput
                inputLabel={'Название продукта'}
                inputValue={name}
                setInput={setName}
              />
              <AdminInput
                inputLabel={'Цена'}
                inputValue={price}
                setInput={setPrice}
              />
              <AdminInput
                inputLabel={'Бренд'}
                inputValue={brand}
                setInput={setBrand}
              />
              <AdminInput
                inputLabel={'Страна'}
                inputValue={country}
                setInput={setCountry}
              />
              <AdminInput
                inputLabel={'Посадка'}
                inputValue={landing}
                setInput={setLanding}
              />
              <AdminInput
                inputLabel={'Стиль'}
                inputValue={style}
                setInput={setStyle}
              />
              <AdminInput
                inputLabel={'Цвет'}
                inputValue={color}
                setInput={setColor}
              />
              <AdminInput
                inputLabel={'Тип ткани'}
                inputValue={fabricType}
                setInput={setFabricType}
              />
              <AdminInput
                inputLabel={'Свойства ткани'}
                inputValue={fabricSettings}
                setInput={setFabricSettings}
              />
              <AdminInput
                inputLabel={'Застежка'}
                inputValue={fastener}
                setInput={setFastener}
              />
              <AdminInput
                inputLabel={'Размеры'}
                inputValue={sizes}
                setInput={setSizes}
              />
            </div>
          </div>
          <div className='admin_btn_container'>
            <CustomButton
              onClick={onUploadSubmit}
              className='control_btn'
              type='button'
              apply
            >
              Применить
            </CustomButton>
            <CustomButton
              onClick={() =>
                history.push(
                  `/shop/${match.params.sectionName}`
                )
              }
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
      ) : null}
    </React.Fragment>
  );
};

export default AddCollection;
