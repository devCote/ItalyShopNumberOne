import { all, call } from 'redux-saga/effects';
import { cartSagas } from './cart/cart.sagas';
import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { directorySagas } from './directory/directory-sagas';
import { adminSagas } from './admin/admin.sagas';

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSagas),
    call(cartSagas),
    call(directorySagas),
    call(adminSagas),
  ]);
}
