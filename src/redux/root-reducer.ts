import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import adminReducer from './admin/admin.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'admin'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer,
  admin: adminReducer,
});

export default persistReducer(persistConfig, rootReducer);
