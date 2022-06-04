import './cart-item.styles.scss';

const CartItem = ({ item }: any) => (
  <div className='cart-item'>
    <img src={item?.imageUrl} alt='item' />
    <div className='item-details'>
      <span className='name'>{item?.name}</span>
      <span className='price'>
        {item?.quantity} x {item.newPrice ? item.newPrice : item?.price}$
      </span>
    </div>
  </div>
);

export default CartItem;
