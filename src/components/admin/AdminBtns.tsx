import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  deleteImage,
  deleteItemFromCollection,
} from '../../firebase/firebase.utils';
import { deleteSection } from '../../firebase/section.delete';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import { selectDirectoryById } from '../../redux/directory/directory.selectors';
import { selectCollectionById } from '../../redux/shop/shop.selectors';
import CustomButton from '../custom-button/custom-button';
import Modal from '../modal/Modal';
import './adminBtns.scss';

interface Props {
  item: any;
  editLink: string;
  fireColl?: string;
  isCollection?: boolean;
}

const AdminBtns = ({ item, editLink, fireColl, isCollection }: Props) => {
  const adminMode = useSelector(selectAdminMode);
  const history = useHistory();
  const [toggleModal, setToggleModal] = useState(false);
  const match: any = useRouteMatch();
  const currentCollection: any = useSelector(selectCollectionById(item.id))
  const currentDirectory: any = useSelector(selectDirectoryById(item.id))
  const [status, setStatus] = useState()

  useEffect(() => {
    if (status === 'done')
      setInterval(() => {
        window.location.reload();
      }, 1000);
  }, [status])

  const onSubmit = () => {
    if (isCollection && fireColl) {
      const sectionRef = currentDirectory[0]?.storageRef
      const productsRef = currentCollection[0]?.storageRef

      deleteSection(item.id, productsRef, sectionRef, setStatus)
    } else {
      deleteImage(`images/${item.id}`, true);
      deleteItemFromCollection(
        'collections',
        match.params.collectionId,
        item.id
      );
    }
  };

  const modBtnClass: () => string = () =>
    isCollection ? 'modify_btn_container_col' : 'modify_btn_container';

  const renderModal = () => {
    if (isCollection)
      return (
        <Modal
          title={item.title}
          body="Вы уверенны, что хотите удалить коллекцию? Удалив коллекцию, Вы удалите все позиции внутри этой коллекции."
          submit="Удалить"
          negative
          cancel="Отмена"
          onDismiss={() => setToggleModal(!toggleModal)}
          onSubmit={onSubmit}
        />
      );
    else
      return (
        <Modal
          title={item.title}
          body="Вы уверенны, что хотите удалить позицию?"
          submit="Удалить"
          negative
          cancel="Отмена"
          onDismiss={() => setToggleModal(!toggleModal)}
          onSubmit={onSubmit}
        />
      );
  };

  return (
    <React.Fragment>
      {adminMode ? (
        <div className={modBtnClass()}>
          <CustomButton
            onClick={() => history.push(editLink)}
            className="modify_btn"
            type="button"
          >
            Изменить
          </CustomButton>
          <CustomButton
            onClick={() => setToggleModal(!toggleModal)}
            className="modify_btn"
            type="button"
          >
            Удалить
          </CustomButton>
          {toggleModal ? renderModal() : null}
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default AdminBtns;
