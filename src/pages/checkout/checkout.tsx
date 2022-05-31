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
    console.log({
      total,
      cartItems,
      credentials: { name, tel, place, department },
    });
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
        alert('Ошибка при отправке.');
        console.log('error', err.message);
      });
    setName('');
    setTel('');
    setPlace('');
    setDepartment('');
    setInverted(!inverted);
  };

  console.log(cartItems);
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="header-block">
          <span>Продукция</span>
        </div>
        <div className="header-block">
          <span>Описание</span>
        </div>
        <div className="header-block">
          <span>Количество</span>
        </div>
        <div className="header-block">
          <span>Цена</span>
        </div>
        <div className="header-block">
          <span>Размер</span>
        </div>
        <div className="header-block">
          <span>Цвет</span>
        </div>
        <div className="header-block">
          <span>Удалить</span>
        </div>
      </div>
      {cartItems.map((cartItem: any) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className="total">
        <span>Сумма к оплате: {total}грн</span>
      </div>
      <div className="test-warning">
        *Данные для тестовой оплаты карты*
        <br />
        4242 4242 4242 4242 - Exp: 01/21 - CVV: 123
      </div>
      <div className="stripe-btn" ref={stripeRef} style={{ display: 'none' }}>
        <StripeCheckoutBtn price={total} />
      </div>
      <div className="payment">
        <CustomButton onClick={stripeCheckout}>Оплата картой</CustomButton>
        <CustomButton
          className="pay_delivery_btn"
          inverted={inverted}
          onClick={deliveryPayment}
        >
          Оплата при получении
        </CustomButton>
      </div>
      {inverted ? (
        <form
          className="payment_form"
          onSubmit={(e) => handleSubmitDelivery(e)}
        >
          <div className="pay_row">
            <label htmlFor="pay_name" className="pay_label">
              Имя и Фамилия
            </label>
            <input
              type="text"
              placeholder="имя получателя"
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
              Мобильный Телефон
            </label>
            <input
              type="telephone"
              value={tel}
              onChange={(e) => {
                setTel(e.target.value);
              }}
              placeholder="телефон получателя"
              className="pay_input"
              required
            />
          </div>

          <div className="pay_row">
            <label htmlFor="pay_city" className="pay_label">
              Город(нп.) получения
            </label>
            <input
              type="text"
              placeholder="место получателя"
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
              Отделение Новой Почты
            </label>
            <input
              type="text"
              placeholder="номер отдела почты"
              value={department}
              onChange={(e) => {
                setDepartment(e.target.value);
              }}
              className="pay_input"
              required
            />
          </div>
          <CustomButton className="pay_btn" type="submit">
            Отправить заказ
          </CustomButton>
        </form>
      ) : null}
    </div>
  );
};

export default CheckoutPage;
