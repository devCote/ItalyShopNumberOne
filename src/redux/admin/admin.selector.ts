import { createSelector } from 'reselect';

const selectAdmin = (state: any) => state.admin;

export const selectAdminMode = createSelector(
  [selectAdmin],
  (admin) => admin.adminMode
);
