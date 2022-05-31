import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  convertCollectionsSnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import { ResponseGenerator } from '../responseGenerator';
import {
  fetchCollectionsFailure,
  fetchCollectionsSuccess,
} from './shop.actions';
import ShopActionTypes from './shop.types';

export function* fetchCollectionsStartAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot: ResponseGenerator = yield collectionRef.get();
    const collectionsMap: ResponseGenerator = yield call(
      convertCollectionsSnapshotToMap,
      snapshot
    );
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure('fetch error'));
  }
}

export function* fetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START,
    fetchCollectionsStartAsync
  );
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)]);
}
