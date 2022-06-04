import React from 'react';
import './sign-in.styles.scss';
import FormInput from '../../form-input/form-input';
import CustomButton from '../../custom-button/custom-button';
import {
  emailSignInStart,
  googleSignInStart,
} from '../../../redux/user/user.actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const SignIn = () => {
  const dispatch = useDispatch();

  const [userCredentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { email, password } = userCredentials;

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log(userCredentials);
    dispatch(emailSignInStart(userCredentials));
  };

  const handleChange = (event: any) => {
    const { value, name } = event.target;
    setCredentials({ ...userCredentials, [name]: value });
  };

  const signGoogle = () => {
    dispatch(googleSignInStart());
  };

  return (
    <div className='sign-in'>
      <h2>Have an acount?</h2>
      <span>Login</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          onChange={handleChange}
          value={email}
          label='email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={password}
          label='password'
          onChange={handleChange}
          required
        />
        <div className='buttons'>
          <CustomButton className='l_btn' type='submit'>
            {' '}
            login{' '}
          </CustomButton>
          <CustomButton
            className='l_btn'
            onClick={signGoogle}
            type='button'
            isGoogleSignIn
          >
            {' '}
            Google{' '}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
