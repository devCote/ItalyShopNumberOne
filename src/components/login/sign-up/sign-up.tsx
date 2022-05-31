import React, { useState } from 'react';
import './sign-up.scss';
import FormInput from '../../form-input/form-input';
import CustomButton from '../../custom-button/custom-button';
import { signUpStart } from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const dispatch = useDispatch();

  const [userCredentials, setuserCredentials] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { displayName, email, password, confirmPassword } = userCredentials;

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }
    const credentials = { email, password, displayName };
    dispatch(signUpStart(credentials));
  };

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setuserCredentials({ ...userCredentials, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">У меня нет аккаунта</h2>
      <span>Укажите данные для регистрации</span>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="displayName"
          value={displayName}
          onChange={handleChange}
          label="Имя"
          required
        ></FormInput>
        <FormInput
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          label="Почта"
          required
        ></FormInput>
        <FormInput
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          label="Пароль"
          required
        ></FormInput>
        <FormInput
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          label="Подтвердите пароль"
          required
        ></FormInput>
        <CustomButton type="submit">Зарегестрироваться</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
