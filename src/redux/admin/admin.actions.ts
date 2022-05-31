import { adminActionTypes } from './admin.types';

export const toggleAdmin = () => ({
  type: adminActionTypes.TOGGLE_ADMIN_MOD,
});

export const exitAdmin = () => ({
  type: adminActionTypes.EXIT_ADMIN_MOD,
});
