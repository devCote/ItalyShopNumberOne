import { useEffect, useRef } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import HomePage from './pages/homepage/homepage';
import ContactPage from './pages/contacts/contacts';
import Header from './components/header/Header';
import LoginPage from './pages/login/login';
import CheckoutPage from './pages/checkout/checkout';
import DetailsPage from './pages/details/details';
import AddSectionPage from './pages/admin/addSectionPage';
import EditSectionPage from './pages/admin/editSectionPage';

import { selectCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';
import { selectIfCartIsEmpty } from './redux/cart/cart.selectors';
import { fetchCollectionsStart } from './redux/shop/shop.actions';
import CollectionPage from './pages/collection/collection';
import { fetchDirectoryStart } from './redux/directory/directory.actions';
import AddCollectionPage from './pages/admin/addCollectionPage';
import EditCollectionPage from './pages/admin/editCollectionPage';
import Bot from './components/bot/Bot';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cartIsEmpty = useSelector(selectIfCartIsEmpty);

  const fetchRef = useRef(() => {
    dispatch(checkUserSession());
    dispatch(fetchDirectoryStart());
    dispatch(fetchCollectionsStart());
  });

  useEffect(() => fetchRef.current(), []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route exact path={'/contacts'} component={ContactPage} />
        <Route
          exact
          path={'/:sectionName'}
          component={CollectionPage}
        />
        <Route
          exact
          path={'/details/:section/:collectionId/:itemId'}
          component={DetailsPage}
        />
        <Route
          exact
          path={'/admin/addsection/'}
          component={AddSectionPage}
        />
        <Route
          exact
          path={'/:sectionName/addProduct'}
          component={AddCollectionPage}
        />
        <Route
          exact
          path={'/admin/editsection/:sectionId'}
          component={EditSectionPage}
        />
        <Route
          exact
          path={'/admin/editcollection/:section/:collectionId/:docId'}
          component={EditCollectionPage}
        />
        <Route
          exact
          path={'/checkout'}
          render={() => (cartIsEmpty ? <CheckoutPage /> : <Redirect to="/" />)}
        />
        <Route
          exact
          path={'/login'}
          render={() => (currentUser ? <Redirect to="/" /> : <LoginPage />)}
        />
      </Switch>
      <Bot />
    </div>
  );
};

export default App;
