import UserActionTypes from '../user/user.types';
import { takeLatest, call, all, put } from 'redux-saga/effects';
import { exitAdmin } from './admin.actions';

export function* exitAdminMod() {
  yield put(exitAdmin());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, exitAdminMod);
}

export function* adminSagas() {
  yield all([call(onSignOutSuccess)]);
}
