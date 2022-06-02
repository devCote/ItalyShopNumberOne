import { createSelector } from 'reselect';

const selectCart = (state: any) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  (cart) => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  (cart) => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce(
      (accumalatedQuantity: number, cartItem: any) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((accumalatedQuantity: number, cartItem: any) => {
    if (cartItem.newPrice)
      return accumalatedQuantity + cartItem.quantity * cartItem.newPrice;
    else return accumalatedQuantity + cartItem.quantity * cartItem.price;
  }, 0)
);

export const selectIfCartIsEmpty = createSelector(
  [selectCart],
  (cart) => !!cart.cartItems.length
);
