import React, { useState } from 'react';
import { ReactComponent as ShopingIcon } from '../../../assets/bag.svg';
import { toggleCartHidden } from '../../../redux/cart/cart.actions';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartItemsCount } from '../../../redux/cart/cart.selectors';

interface Props {
  color: string;
}

const CartIcon = ({ color }: Props) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectCartItemsCount);

  return (
    <div className='shop_icon' onClick={() => dispatch(toggleCartHidden())}>
      <ShopingIcon stroke={color} fill={color} />
      <span
        className={itemCount === 0 ? 'items_count_0' : itemCount < 10 ? 'items_count_1' : 'items_count_10'}>
        {itemCount}
      </span>
    </div>
  );
};

export default CartIcon;
