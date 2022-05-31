import directoryActionTypes from './directory.types';

export const fetchDirectoryStart = () => ({
  type: directoryActionTypes.FETCH_DIRECTORY_START,
});

export const fetchDirectorySuccess = (directoryMap: any) => ({
  type: directoryActionTypes.FETCH_DIRECTORY_SUCCESS,
  payload: directoryMap,
});

export const fetchDirectoryFailure = (errorMessage: string) => ({
  type: directoryActionTypes.FETCH_DIRECTORY_FAILURE,
  payload: errorMessage,
});
