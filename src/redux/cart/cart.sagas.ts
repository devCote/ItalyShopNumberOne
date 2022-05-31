import { takeLatest, call, all, put } from 'redux-saga/effects';
import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* clearCartOnPaymentSuccess() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}
export function* OnPaymentSuccess() {
  yield takeLatest(UserActionTypes.PAYMENT_SUCCESS, clearCartOnPaymentSuccess);
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess), call(OnPaymentSuccess)]);
}
