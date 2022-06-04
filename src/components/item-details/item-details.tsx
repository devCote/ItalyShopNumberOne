import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button';
import { selectCollectionByUrl } from '../../redux/shop/shop.selectors';
import { addItem } from '../../redux/cart/cart.actions';

import { useDispatch } from 'react-redux';
import './item-details.scss';
import NewSpinner from '../new-spinner/NewSpinner';

const ItemDetails = () => {
  const match: any = useRouteMatch();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentImg, setCurrentImg] = useState(0);
  const collection: any = useSelector(
    selectCollectionByUrl(match.params.collectionId)
  );
  const item: any = collection
    ? collection[0].items.filter(
      (i: any) => Number(i.id) === Number(match.params.itemId)
    )
    : null;

  if (!item) return <NewSpinner />;

  const {
    imageUrl,
    name,
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
  } = item[0];

  const imgChangeHandler = (e: any) => {
    e.target.src = imageUrl[currentImg];
    const temp = e.target.alt;
    e.target.alt = `${currentImg}`;
    setCurrentImg(Number(temp));
  };

  return (
    <div className='details_item_container'>
      <div className='details_header'>
        <h1 className='details_product_tittle'>{name}</h1>
        {newPrice ? (
          <React.Fragment>
            <h1 className='details_product_old_price'>{price}</h1>
            <h1 className='details_product_price'>{newPrice}$</h1>
          </React.Fragment>
        ) : (
          <h1 className='details_product_price'>{price}грн</h1>
        )}
      </div>
      <div className='details_product_container'>
        <img className='details_img' src={imageUrl[currentImg]} alt='' />
        {imageUrl.length > 1 ? (
          <div className='details_img_container'>
            {imageUrl[1] ? (
              <img
                className='details_img_preview'
                onClick={(e) => imgChangeHandler(e)}
                src={imageUrl[1]}
                alt='1'
              />
            ) : null}
            {imageUrl[2] ? (
              <img
                className='details_img_preview'
                onClick={(e) => imgChangeHandler(e)}
                src={imageUrl[2]}
                alt='2'
              />
            ) : null}
            {imageUrl[3] ? (
              <img
                className='details_img_preview'
                onClick={(e) => imgChangeHandler(e)}
                src={imageUrl[3]}
                alt='3'
              />
            ) : null}
            {imageUrl[4] ? (
              <img
                className='details_img_preview'
                onClick={(e) => imgChangeHandler(e)}
                src={imageUrl[4]}
                alt='4'
              />
            ) : null}
          </div>
        ) : null}
        <div className='details_product_info'>
          <table className='details_table'>
            {brand ? (
              <tr>
                <th>Brand</th>
                <td>{brand}</td>
              </tr>
            ) : null}
            {country ? (
              <tr>
                <th className='th2'>Country</th>
                <td className='td2'>{country}</td>
              </tr>
            ) : null}
            {landing ? (
              <tr>
                <th>Landing</th>
                <td>{landing}</td>
              </tr>
            ) : null}
            {style ? (
              <tr>
                <th className='th2'>Style</th>
                <td className='td2'>{style}</td>
              </tr>
            ) : null}
            {color ? (
              <tr>
                <th>Color</th>
                <td>{color}</td>
              </tr>
            ) : null}
            {fabricType ? (
              <tr>
                <th className='th2'>Fabric</th>
                <td className='td2'>{fabricType}</td>
              </tr>
            ) : null}
            {fabricSettings ? (
              <tr>
                <th>Fabric Settings</th>
                <td>{fabricSettings}</td>
              </tr>
            ) : null}
            {fastener ? (
              <tr>
                <th className='th2'>Fastener</th>
                <td className='td2'>{fastener}</td>
              </tr>
            ) : null}
            {sizes ? (
              <tr>
                <th>Sizes</th>
                <td>{sizes}</td>
              </tr>
            ) : null}
          </table>
        </div>
      </div>
      <div className='details_btns'>
        <CustomButton
          className='details_back_btn'
          onClick={() =>
            history.push(
              `/shop/${match.params.section}/${match.params.collectionId}`
            )
          }
        >
          Back
        </CustomButton>
        <CustomButton
          className='details_add_btn'
          onClick={() => dispatch(addItem(item[0]))}
          overlay
        >
          Add to cart
        </CustomButton>
      </div>
    </div>
  );
};

export default ItemDetails;
