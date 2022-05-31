import userActionsTypes from './user.types';

export const googleSignInStart = () => ({
  type: userActionsTypes.GOOGLE_SIGN_IN_START,
});

export const signInSucces = (user: string) => ({
  type: userActionsTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error: string) => ({
  type: userActionsTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const emailSignInStart = (userCredentials: any) => ({
  type: userActionsTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const checkUserSession = () => ({
  type: userActionsTypes.CHECK_USER_SESSION,
});

export const signOutStart = () => ({
  type: userActionsTypes.SIGN_OUT_START,
});
export const signOutSuccess = () => ({
  type: userActionsTypes.SIGN_OUT_SUCCESS,
});
export const signOutFailure = (error: string) => ({
  type: userActionsTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (userData: any) => ({
  type: userActionsTypes.SIGN_UP_START,
  payload: userData,
});
export const signUpSuccess = () => ({
  type: userActionsTypes.SIGN_UP_SUCCESS,
});
export const signUpFailure = (error: string) => ({
  type: userActionsTypes.SIGN_UP_FAILURE,
  payload: error,
});

export const paymentSuccess = () => ({
  type: userActionsTypes.PAYMENT_SUCCESS,
});
