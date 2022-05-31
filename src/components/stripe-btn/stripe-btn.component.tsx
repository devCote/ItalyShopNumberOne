import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { paymentSuccess } from '../../redux/user/user.actions';
import Image from '../../assets/favicon-logo1.png';

// TODO - price, paymentSuccess
const StripeCheckoutBtn = ({ price }: any) => {
  const dispatch = useDispatch();
  const priceForStripe = price * 100;
  const publishableKey =
    'pk_test_51HpHg6FlzvANYvNV4E37iWhqiosVdlMXvho3IIwea2am8YFctygmeHBzwWTpUrtbfIKeTcedPHEZgDgMTX3Ahbvw00nNXQ7Yxg';

  const onToken = (token: any) => {
    axios({
      url: 'http://13.58.115.150:5000/payment',
      method: 'POST',
      data: {
        amount: priceForStripe,
        token: token,
      },
    })
      .then((_response) => {
        alert('Оплата произведена успешно!');
        dispatch(paymentSuccess());
      })
      .catch((err) => {
        alert(
          'Ошибка при оплате. Пожалуйста убедитесь, что Вы ввели коректные данные карты.'
        );
        console.log('payment error', err.message);
      });
  };

  return (
    <StripeCheckout
      label='Оплата картой'
      name='Number1 Ltd'
      billingAddress
      shippingAddress
      image={Image}
      description={`Сумма Вашего заказа: ₴${price}`}
      amount={priceForStripe}
      panelLabel='Оплата картой'
      token={onToken}
      stripeKey={publishableKey}
      locale='auto'
    />
  );
};

export default StripeCheckoutBtn;
