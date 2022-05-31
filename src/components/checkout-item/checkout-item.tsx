import React from 'react';
import './checkout-item.styles.scss';
import { useDispatch } from 'react-redux';
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from '../../redux/cart/cart.actions';

const CheckoutItem = ({ cartItem }: any) => {
  const { name, imageUrl, price, quantity, sizes, color, newPrice } = cartItem;
  const dispatch = useDispatch();

  return (
    <div className='checkout-item'>
      <div className='image-container'>
        <img src={imageUrl} alt='item' />
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={() => dispatch(removeItem(cartItem))}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={() => dispatch(addItem(cartItem))}>
          &#10095;
        </div>
      </span>
      {newPrice ? (
        <span className='price'>{newPrice * quantity}грн</span>
      ) : (
        <span className='price'>{price * quantity}грн</span>
      )}
      <span className='color'>{color}</span>
      <span className='size'>{sizes}</span>
      <span
        className='remove-button'
        onClick={() => dispatch(clearItemFromCart(cartItem))}
      >
        &#10006;
      </span>
    </div>
  );
};

export default CheckoutItem;
