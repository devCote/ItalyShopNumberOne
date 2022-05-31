import userActionsTypes from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: null,
  isLoading: false,
};

//interface Act {
//type: string;
//payload: object;
//}

const userReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case userActionsTypes.SIGN_UP_START:
    case userActionsTypes.GOOGLE_SIGN_IN_START:
    case userActionsTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
      };

    case userActionsTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        isLoading: false,
        error: null,
      };
    case userActionsTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null,
      };
    case userActionsTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };

    case userActionsTypes.SIGN_IN_FAILURE:
    case userActionsTypes.SIGN_OUT_FAILURE:
    case userActionsTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
