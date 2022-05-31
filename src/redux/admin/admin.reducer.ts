import { adminActionTypes } from './admin.types';

const INITIAL_STATE = {
  adminMode: false,
};

const adminReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case adminActionTypes.TOGGLE_ADMIN_MOD:
      return {
        ...state,
        adminMode: !state.adminMode,
      };
    case adminActionTypes.EXIT_ADMIN_MOD:
      return {
        ...state,
        adminMode: false,
      };
    default:
      return state;
  }
};

export default adminReducer;
