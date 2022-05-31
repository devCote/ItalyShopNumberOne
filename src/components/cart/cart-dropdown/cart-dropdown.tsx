import React, { useEffect, useRef } from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../../custom-button/custom-button';
import CartItem from '../cart-item/cart-item';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../../redux/cart/cart.selectors';
import { useHistory } from 'react-router-dom';
import { toggleCartHidden } from '../../../redux/cart/cart.actions';

const CartDropdown = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const history = useHistory();
  const refDrop: any = useRef();

  useEffect(() => {
    const onClickEvent = (event: any) => {
      if (!refDrop.current) return;
      if (!refDrop.current.contains(event.target)) {
        dispatch(toggleCartHidden());
      }
    };

    document.body.addEventListener('click', onClickEvent);

    return () => {
      document.body.removeEventListener('click', onClickEvent);
    };
  });

  return (
    <div className="cart-dropdown" ref={refDrop}>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((e: any) => <CartItem key={e.id} item={e} />)
        ) : (
          <span className="empty-message">корзина пуста</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push('/checkout');
          dispatch(toggleCartHidden());
        }}
      >
        мои заказы
      </CustomButton>
    </div>
  );
};

export default CartDropdown;
