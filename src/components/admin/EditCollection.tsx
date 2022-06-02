import React, { useEffect, useRef, useState } from 'react';
import './section.scss';
import { useSelector } from 'react-redux';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import CustomButton from '../custom-button/custom-button';
import {
  addItemToCollection,
  deleteImage,
} from '../../firebase/firebase.utils';
import { useHistory, useRouteMatch } from 'react-router-dom';
import AdminInput from './AdminInput';
import {
  selectCollectionByUrl,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';

const EditCollection = () => {
  const [imageUrl, setImageUrl]: any = useState([]);
  const [file, setFile]: any = useState([]);
  const [percentage,] = useState(null);
  const [status,] = useState(null);
  const [childRef,]: any = useState(null);
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
  const [startUpdate, setStartUpdate] = useState(false);
  const isLoaded = useSelector(selectIsCollectionsLoaded);
  const [currentStatus, setCurrentStatus] = useState(isLoaded);
  const [discountToggle, setDiscountToggle] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [newPrice, setNewPrice] = useState(0);

  const discountRef: any = useRef();
  const discountFunc = () => {
    if (!discount || discount === 0) return;
    setDiscount(discount);
    const newPriceVar = (Number(price) * Number(discount)) / 100;
    setNewPrice(Math.round(price - newPriceVar));
  };
  discountRef.current = discountFunc;

  useEffect(() => {
    discountRef.current();
    if (discountToggle === false) {
      setNewPrice(0);
      setDiscount(0);
    }
  }, [discount, discountToggle]);

  useEffect(() => {
    setCurrentStatus(isLoaded);
  }, [isLoaded]);

  const uploadRef: any = useRef();
  const admin = useSelector(selectAdminMode);
  const history = useHistory();
  const match: any = useRouteMatch();
  const collection: any = useSelector(
    selectCollectionByUrl(match.params.collectionId)
  );

  const fetchItem = () => {
    if (!collection) return;
    const item: any = collection[0].items.filter(
      (i: any) => Number(i.id) === Number(match.params.docId)
    );
    console.info(item);
  };

  const fetchItemRef = useRef(fetchItem);

  const addItem = () => {
    addItemToCollection(
      'collections',
      {
        id: match.params.docId,
        imageUrl,
        name,
        childRef,
        price,
        brand,
        country,
        landing,
        style,
        color,
        fabricType,
        fabricSettings,
        fastener,
        sizes,
        newPrice,
        discount,
      },
      match.params.collectionId
    );
  };

  const addItemRef: any = useRef();
  addItemRef.current = addItem;
  const reload: any = useRef(() => {
    setTimeout(() => {
      window.location.replace(
        `/shop/${match.params.section}/${match.params.collectionId}`
      );
    }, 1000);
  });

  useEffect(() => {
    if (newPrice) setDiscountToggle(true);
  }, [newPrice]);

  useEffect(() => {
    if (currentStatus) {
      fetchItemRef.current();
    }
  }, [currentStatus]);

  useEffect(() => {
    if (startUpdate) {
      addItemRef.current();
      reload.current();
    }
  }, [startUpdate]);

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

  const onUploadSubmit = () => {
    if (file.length > 0) {
      deleteImage(`images/${match.params.docId}`, true);
    }
    setStartUpdate(true);
  };

  const handleImgChange = (e: any) => {
    setCurrentId(e.target.id);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };

  if (!admin) return <h1>Режим админа не включен</h1>;

  return (
    <React.Fragment>
      {admin ? (
        <React.Fragment>
          <div className='admin_preview_container'>
            <div className='showcard_admin_row'>
              <div onClick={uploadFile} className='collection-item_admin'>
                <img
                  className='image'
                  src={imageUrl.length > 0 ? imageUrl[currentId] : null}
                  alt=''
                />
                {discountToggle ? (
                  <React.Fragment>
                    <div className='image_discount_back' />
                    <div className='image_discount_num'>{discount}%</div>
                    <div className='image_discount_word'>Скидка</div>
                  </React.Fragment>
                ) : null}
                <div className='collection-footer'>
                  <span className='name'>{name}</span>
                  <div className='price_cont'>
                    {newPrice && discountToggle ? (
                      <React.Fragment>
                        <span className='oldPrice'>{price}</span>
                        <span className='price'>{newPrice}грн</span>
                      </React.Fragment>
                    ) : (
                      <span className='price'>{price}грн</span>
                    )}
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
            <div className='discount_container'>
              <h1 className='discount_title'>Скидка</h1>
              <input
                className='discount_check'
                type='checkbox'
                checked={discountToggle ? true : false}
                name='discount'
                value={discount}
                onChange={() => setDiscountToggle(!discountToggle)}
              />
              <label style={{ marginBottom: '10px' }} htmlFor='discount'>
                {' '}
                АКТИВИРОВАТЬ
              </label>
              {discountToggle ? (
                <AdminInput
                  inputLabel={'Discount'}
                  inputValue={discount}
                  setInput={setDiscount}
                />
              ) : null}
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
                  `/shop/${match.params.section}/${match.params.collectionId}`
                )
              }
              className='control_btn'
              type='button'
            >
              Вернуться
            </CustomButton>
          </div>
          <div className='admin_status_container'>
            {status && percentage ? (
              <div className='upload_status'>
                <p className='status'>{status}</p>
                {percentage !== '100' ? (
                  <p className='percentage'>{percentage}%</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default EditCollection;
