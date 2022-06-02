import { createSelector } from 'reselect';

const selectShop = (state: any) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionByUrl = (sectionName: any) =>
  createSelector([selectCollections], (collections) =>
    collections
      ? Object.values(collections).filter((i: any) => i.url === sectionName)
      : console.log('no collection selected ' + sectionName)
  );

export const selectCollectionById = (id: any) =>
  createSelector([selectCollections], (collections) =>
    collections
      ? Object.values(collections).filter((i: any) => i.id === id)
      : console.log('no collection selected ' + id)
  );


export const selectIsCollectionFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.collections
);
