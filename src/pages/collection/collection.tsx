import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item';

//import {
//SpinnerOverlay,
//SpinnerContainer,
//} from '../../components/with-spinner/with-spinner.styles';
import {
  selectCollection,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';
import './collection.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import NewSpinner from '../../components/new-spinner/NewSpinner';

const CollectionPage = () => {
  const isLoaded = useSelector(selectIsCollectionsLoaded);
  const [currentStatus, setCurrentStatus] = useState(isLoaded);

  useEffect(() => {
    setCurrentStatus(isLoaded);
  }, [isLoaded]);

  const adminMode = useSelector(selectAdminMode);
  const history = useHistory();
  const match: any = useRouteMatch();
  const collectionName = match.params.collectionName;
  const collectionId = match.params.collectionId;
  const collection: any = useSelector(selectCollection(collectionId));

  const Admin = () => (
    <React.Fragment>
      {adminMode ? (
        <div
          className="collection_item_admin"
          onClick={() => {
            history.push(
              `/admin/addcollection/${collectionName}/${collectionId}`
            );
          }}
        >
          <p className="sign_to_action">+</p>
          <p className="text_to_action">Добавить позицию</p>
        </div>
      ) : null}
    </React.Fragment>
  );

  const Title = () => (
    <React.Fragment>
      {currentStatus && collection[0] ? (
        <h2 className="title">{collectionName}</h2>
      ) : null}
    </React.Fragment>
  );

  const Item = () => (
    <React.Fragment>
      {currentStatus && collection[0] ? (
        <React.Fragment>
          {collection[0].items.map((item: any) => (
            <CollectionItem
              key={item.id}
              collectionId={collectionId}
              collectionName={collectionName}
              item={item}
            />
          ))}
        </React.Fragment>
      ) : (
        <div className="empty_cont">
          <p className="empty">Пусто</p>
        </div>
      )}
    </React.Fragment>
  );

  const Spinner = () => <NewSpinner />;

  return (
    <div className="collection-page">
      <Title />
      <div className="items">
        {currentStatus ? (
          <React.Fragment>
            <Admin />
            <Item />
          </React.Fragment>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
