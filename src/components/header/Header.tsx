import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../../assets/italy_fashion1.png';
//import { ReactComponent as Search } from '../../assets/search.svg';
import CartIcon from '../cart/cart-icon/cart-icon';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import CartDropdown from '../cart/cart-dropdown/cart-dropdown';

import './Header.scss';
import './HeaderSlider.scss';
import { useDispatch, useSelector } from 'react-redux';
import { toggleAdmin } from '../../redux/admin/admin.actions';
import { selectAdminMode } from '../../redux/admin/admin.selector';

const Header = () => {
  const [color, setColor] = useState('white');
  const currentUser = useSelector(selectCurrentUser);
  const hidden = useSelector(selectCartHidden);
  const dispatch = useDispatch();
  const adminMode = useSelector(selectAdminMode);

  return (
    <div className="header">
      <Link to="/">
        <img src={Logo} alt="logo" className="header_logo"></img>
      </Link>
      {/** search component **/}

      {/** <div className="header_search">
        <input type="text" className="header_searchInput" />
        <Search className="search_icon" />
          </div> **/}
      <div className="header_nav">
        <React.Fragment>
          {currentUser ? (
            <React.Fragment>
              {currentUser.displayName === 'Dmitriy Bahanenko' ? (
                <div className="header_option_slider">
                  <span className="header_optionLineOne">Админ</span>
                  <div className="header_optionLineTwo">
                    <label className="switch">
                      <input
                        onChange={() => dispatch(toggleAdmin())}
                        type="checkbox"
                        checked={adminMode ? true : false}
                      />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              ) : null}
            </React.Fragment>
          ) : null}
        </React.Fragment>
        <Link to="/" className="header_option standart">
          <span className="header_optionLineOne">Коллекции</span>
          <span className="header_optionLineTwo">Главная</span>
        </Link>
        <Link to="/login" className="header_option standart">
          <span className="header_optionLineOne">Привет</span>
          {currentUser ? (
            <span
              className="header_optionLineTwo"
              onClick={() => dispatch(signOutStart())}
              style={
                currentUser.displayName.length > 12
                  ? { fontSize: '0.7rem' }
                  : {}
              }
            >
              {currentUser.displayName}
            </span>
          ) : (
            <span className="header_optionLineTwo">Логин</span>
          )}
        </Link>
        <Link to="/checkout" className="header_option standart">
          <span className="header_optionLineOne">Покупки</span>
          <span className="header_optionLineTwo">Заказы</span>
        </Link>
        <Link to="/contacts" className="header_option standart">
          <span className="header_optionLineOne">О нас</span>
          <span className="header_optionLineTwo">Контакты</span>
        </Link>
        <div
          onMouseEnter={() => setColor('#743ad5')}
          onMouseLeave={() => setColor('#fff')}
          className="shopicon_container"
        >
          <CartIcon color={color} />
        </div>
        {hidden ? null : <CartDropdown />}
      </div>
    </div>
  );
};

export default Header;
