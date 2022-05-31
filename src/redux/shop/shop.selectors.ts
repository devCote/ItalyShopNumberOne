import { createSelector } from 'reselect';

const selectShop = (state: any) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollection = (collectionId: any) =>
  createSelector([selectCollections], (collections) =>
    collections
      ? Object.values(collections).filter((i: any) => i.id === collectionId)
      : console.log('no collection selected ' + collectionId)
  );

export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
