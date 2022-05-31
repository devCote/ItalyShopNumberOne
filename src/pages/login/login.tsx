import React from 'react';
import './login.scss';
import SignIn from '../../components/login/sign-in/sign-in';
import SignUp from '../../components/login/sign-up/sign-up';
import { userAuthificationLoaded } from '../../redux/user/user.selectors';
//import {
//SpinnerOverlay,
//SpinnerContainer,
//} from '../../components/with-spinner/with-spinner.styles';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NewSpinner from '../../components/new-spinner/NewSpinner';

const LoginPage = () => {
  const isLoading = useSelector((state) => !userAuthificationLoaded(state));
  const [currentStatus, setCurrentStatus] = useState(isLoading);

  useEffect(() => {
    setCurrentStatus(isLoading);
  }, [isLoading]);

  return (
    <div className='login'>
      {currentStatus ? (
        <>
          <SignIn />
          <SignUp />
        </>
      ) : (
        <NewSpinner />
      )}
    </div>
  );
};

export default LoginPage;
