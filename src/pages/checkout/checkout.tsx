import React, { useRef, useState } from 'react';
import './checkout.styles.scss';
import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import StripeCheckoutBtn from '../../components/stripe-btn/stripe-btn.component';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/custom-button/custom-button';
import axios from 'axios';
import { paymentSuccess } from '../../redux/user/user.actions';

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const [inverted, setInverted] = useState(false);
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [place, setPlace] = useState('');
  const [department, setDepartment] = useState('');
  const dispatch = useDispatch();

  const stripeRef: any = useRef();

  const stripeCheckout = () => {
    setInverted(false);
    stripeRef.current.children[0].click();
  };

  const deliveryPayment = () => {
    setInverted(!inverted);
  };

  const handleSubmitDelivery = (e: any) => {
    e.preventDefault();
    axios({
      url: 'http://34.136.124.116:3535/delivery',
      method: 'POST',
      data: {
        total,
        cartItems,
        credentials: { name, tel, place, department },
      },
    })
      .then((_response) => {
        alert('Заявка отправлена!');
        dispatch(paymentSuccess());
      })
      .catch((err) => {
        alert('Ошибка при отправке.' + err);
      });
    setName('');
    setTel('');
    setPlace('');
    setDepartment('');
    setInverted(!inverted);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Info</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Size</span>
        </div>
        <div className="header-block">
          <span>Color</span>
        </div>
        <div className="header-block">
          <span>Delete</span>
        </div>
      </div>
      {cartItems.map((cartItem: any) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>Total: {total}$</span>
      </div>
      <div className="test-warning">
        *For test card pay*
        <br />
        4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
      </div>
      <div className="stripe-btn" ref={stripeRef} style={{ display: 'none' }}>
        <StripeCheckoutBtn price={total} />
      </div>
      <div className="payment">
        <CustomButton onClick={stripeCheckout}>Card Pay</CustomButton>
        <CustomButton
          className="pay_delivery_btn"
          inverted={inverted}
          onClick={deliveryPayment}
        >
          Pay on delivery
        </CustomButton>
      </div>
      {inverted ? (
        <form
          className="payment_form"
          onSubmit={(e) => handleSubmitDelivery(e)}
        >
          <div className="pay_row">
            <label htmlFor="pay_name" className="pay_label">
              Fistname Lastname
            </label>
            <input
              type="text"
              placeholder="name"
              className="pay_input"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="pay_row">
            <label htmlFor="pay_tel" className="pay_label">
              Phone number
            </label>
            <input
              type="telephone"
              value={tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
              placeholder="phone"
              className="pay_input"
              required
            />
          </div>

          <div className="pay_row">
            <label htmlFor="pay_city" className="pay_label">
              City
            </label>
            <input
              type="text"
              placeholder="city"
              value={place}
              onChange={(e) => {
                setPlace(e.target.value);
              }}
              className="pay_input"
              required
            />
          </div>

          <div className="pay_row">
            <label htmlFor="pay_partNP" className="pay_label">
              Address
            </label>
            <input
              type="text"
              placeholder="address"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              className="pay_input"
              required
            />
          </div>
          <CustomButton className="pay_btn" type="submit">
            Submit
          </CustomButton>
        </form>
      ) : null}
    </div>
  );
};

export default CheckoutPage;
