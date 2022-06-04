import axios from 'axios';
import { useRef, useState } from 'react';
import CustomButton from '../custom-button/custom-button';
import './Bot.scss';
import { ReactComponent as ChatIcon } from '../../assets/chat.svg';

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
      alert('No name');
      return;
    }
    if (tel || text) {
      axios({
        url: 'http://34.136.124.116:3535/message',
        method: 'POST',
        data: { name, tel, text },
      })
        .then((_res) => alert('message sent'))
        .catch((err) => console.log(err.message));
      setName('');
      setTel('');
      setText('');
      handleBotHide();
    } else {
      alert('enter message or phone number');
    }
  };

  return (
    <div ref={botIconRef} onClick={handleBotShow} className={animeClass}>
      <ChatIcon className="bot_phone_icon" />
      <div className="bot_message_container" style={{ display }}>
        <div className="bot_message_header">
          <h2 className="bot_title">Request a callback or message us</h2>
        </div>
        <div className="bot_message_body">
          <form className="bot_form">
            <input
              className="bot_input"
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
              value={name}
              required
            />
            <input
              className="bot_input"
              onChange={(e) => setTel(e.target.value)}
              type="text"
              placeholder="Tel"
              value={tel}
            />
            <textarea
              className="bot_textarea"
              placeholder="Message"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </form>
          <div className="bot_btns">
            <CustomButton className="bot_btn" onClick={handleBotHide}>
              Close
            </CustomButton>
            <CustomButton className="bot_btn" onClick={handleSubmit}>
              Send
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bot;
