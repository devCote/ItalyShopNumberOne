import directoryActionTypes from './directory.types';

const INITIAL_STATE = {
  directory: null,
  isFetching: false,
  errorMessage: undefined,
};

const directoryReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case directoryActionTypes.FETCH_DIRECTORY_START:
      return {
        ...state,
        isFetching: true,
      };
    case directoryActionTypes.FETCH_DIRECTORY_SUCCESS:
      return {
        ...state,
        isFetching: false,
        directory: action.payload,
      };
    case directoryActionTypes.FETCH_DIRECTORY_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

export default directoryReducer;
