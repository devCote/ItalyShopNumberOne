import { takeLatest, call, put, all } from 'redux-saga/effects';
import {
  convertDirectorySnapshotToMap,
  firestore,
} from '../../firebase/firebase.utils';
import { ResponseGenerator } from '../responseGenerator';
import {
  fetchDirectoryFailure,
  fetchDirectorySuccess,
} from './directory.actions';
import directoryActionTypes from './directory.types';

export function* fetchDirectoryStartAsync() {
  try {
    const directoryRef = firestore.collection('sections');
    const snapshot: ResponseGenerator = yield directoryRef.get();
    const directoryMap: ResponseGenerator = yield call(
      convertDirectorySnapshotToMap,
      snapshot
    );
    yield put(fetchDirectorySuccess(directoryMap));
  } catch (error) {
    yield put(fetchDirectoryFailure('An error has occured'));
  }
}

export function* fetchDirectoryStart() {
  yield takeLatest(
    directoryActionTypes.FETCH_DIRECTORY_START,
    fetchDirectoryStartAsync
  );
}

export function* directorySagas() {
  yield all([call(fetchDirectoryStart)]);
}
