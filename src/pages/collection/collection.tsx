import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CollectionItem from '../../components/collection-item/collection-item';
import {
  selectCollection,
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';
import './collection.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import NewSpinner from '../../components/new-spinner/NewSpinner';
import CollectionAdmin from './collectionAdmin';

const CollectionPage = () => {
  const isLoaded = useSelector(selectIsCollectionsLoaded);
  const [currentStatus, setCurrentStatus] = useState(isLoaded);

  useEffect(() => {
    setCurrentStatus(isLoaded);
  }, [isLoaded]);

  const adminMode = useSelector(selectAdminMode);
  const history = useHistory();
  const match: any = useRouteMatch();
  const sectionName = match.params.sectionName;
  const collection: any = useSelector(selectCollection(sectionName));
  console.log({ collection })

  const Title = () => (
    <>
      {currentStatus && collection[0] ? (
        <h2 className="title">{collection[0].title}</h2>
      ) : null}
    </>
  );

  const Item = () => (
    <>
      {currentStatus && collection[0] ? (
        <>
          {collection[0].items.map((item: any) => (
            <CollectionItem
              key={item.id}
              collectionName={sectionName}
              item={item}
            />
          ))}
        </>
      ) : (
        <div className="empty_cont">
          <p className="empty">Пусто</p>
        </div>
      )}
    </>
  );

  return (
    <div className="collection-page">
      <Title />
      <div className="items">
        {currentStatus ? (
          <>
            {adminMode && <CollectionAdmin history={history} sectionName={sectionName} />}
            <Item />
          </>
        ) : (
          <NewSpinner />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
