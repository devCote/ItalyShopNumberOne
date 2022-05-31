import axios from 'axios';
import React, { useRef, useState } from 'react';
import CustomButton from '../custom-button/custom-button';
import './Bot.scss';
import { ReactComponent as PhoneIcon } from '../../assets/speach.svg';

const Bot = () => {
  const [display, setDisplay] = useState('none');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [text, setText] = useState('');
  const [animeClass, setAnimeClass] = useState('bot_contact_icon_initialState');

  const botIconRef: any = useRef();

  const handleBotShow = () => {
    if (animeClass === 'bot_contact_icon_secondState') return;
    setAnimeClass('bot_contact_icon_show');
    setTimeout(() => {
      setAnimeClass('bot_contact_icon_secondState');
      setDisplay('flex');
    }, 1000);
  };

  const handleBotHide = () => {
    setDisplay('none');
    setAnimeClass('bot_contact_icon_hide');
    setTimeout(() => {
      setAnimeClass('bot_contact_icon_initialState');
    }, 1000);
  };

  const handleSubmit = () => {
    if (!name) {
      alert('Вы не ввели имя');
      return;
    }
    if (tel || text) {
      axios({
        url: 'http://34.136.124.116:3535/message',
        method: 'POST',
        data: { name, tel, text },
      })
        .then((_res) => alert('Сообщение отправлено'))
        .catch((err) => console.log(err.message));
      setName('');
      setTel('');
      setText('');
      handleBotHide();
    } else {
      alert('Введите телефон либо сообщение');
    }
  };

  return (
    <div ref={botIconRef} onClick={handleBotShow} className={animeClass}>
      {/* <img
        src={PhoneIcon}
        alt='PhoneIcon'
        style={display === 'none' ? { display: 'flex' } : { display: 'none' }}
        className='bot_phone_icon'
      /> */}
      <PhoneIcon className="bot_phone_icon" />
      <div className="bot_message_container" style={{ display }}>
        <div className="bot_message_header">
          <h2 className="bot_title">Услуга перезвонить или оставить отзыв</h2>
        </div>
        <div className="bot_message_body">
          <form className="bot_form">
            <input
              className="bot_input"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Имя"
              value={name}
              required
            />
            <input
              className="bot_input"
              onChange={(e) => setTel(e.target.value)}
              type="text"
              placeholder="Телефон"
              value={tel}
            />
            <textarea
              className="bot_textarea"
              placeholder="Сообщение"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
          <div className="bot_btns">
            <CustomButton className="bot_btn" onClick={handleBotHide}>
              Закрыть
            </CustomButton>
            <CustomButton className="bot_btn" onClick={handleSubmit}>
              Отправить
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
