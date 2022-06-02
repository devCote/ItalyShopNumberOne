import { createSelector } from 'reselect';

const selectDirectory = (state: any) => state.directory;

export const selectDirectorySection = createSelector(
  [selectDirectory],
  (directory) => directory.directory
);

export const selectCurrentSection = (name: string) => createSelector(
  [selectDirectory],
  (directory) => directory?.directory?.filter((el: { url: string }) => el?.url === name)
)

export const selectDirectoryById = (id: string) => createSelector(
  [selectDirectory],
  (directory) => directory?.directory?.filter((el: { id: string }) => el?.id === id)
)


export const selectIsDirectoryFetching = createSelector(
  [selectDirectory],
  (directory) => directory.isFetching
);

export const selectIsDirectoryLoaded = createSelector(
  [selectDirectory],
  (directory) => !!directory.directory
);
