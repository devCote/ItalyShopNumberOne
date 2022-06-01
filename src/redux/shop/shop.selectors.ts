import { createSelector } from 'reselect';

const selectShop = (state: any) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = (sectionName: any) =>
  createSelector([selectCollections], (collections) =>
    collections
      ? Object.values(collections).filter((i: any) => i.engTitle === sectionName)
      : console.log('no collection selected ' + sectionName)
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
