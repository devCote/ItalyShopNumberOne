import React from 'react';
import './collection-item.styles.scss';
import CustomButton from '../custom-button/custom-button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import { useHistory } from 'react-router-dom';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import AdminBtns from '../admin/AdminBtns';

const CollectionItem = ({ item, collectionId, collectionName }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { name, price, imageUrl, discount, newPrice } = item;
  const adminMode = useSelector(selectAdminMode);

  const showDetails = () => {
    history.push(`/details/${collectionName}/${collectionId}/${item.id}`);
  };

  return (
    <div className="collection-item">
      <img className="image" onClick={showDetails} src={imageUrl} alt="" />
      {discount ? (
        <React.Fragment>
          <div className="image_discount_back" />
          <div className="image_discount_num">{discount}%</div>
          <div className="image_discount_word">discount</div>
        </React.Fragment>
      ) : null}
      <div className="collection-footer">
        <span className="name">{name}</span>
        <div className="price_cont">
          {newPrice ? (
            <React.Fragment>
              <span className="oldPrice">{price}</span>
              <span className="price">{newPrice}$</span>
            </React.Fragment>
          ) : (
            <span className="price">{price}$</span>
          )}
        </div>
      </div>
      {adminMode ? (
        <AdminBtns
          item={item}
          editLink={`/admin/editcollection/${collectionName}/${collectionId}/${item.id}`}
        />
      ) : (
        <CustomButton onClick={() => dispatch(addItem(item))} inverted>
          add to cart
        </CustomButton>
      )}
    </div>
  );
};

export default CollectionItem;
