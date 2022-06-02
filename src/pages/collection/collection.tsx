import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  selectIsCollectionsLoaded,
} from '../../redux/shop/shop.selectors';
import NewSpinner from '../../components/new-spinner/NewSpinner';
import Collection from '../../components/collection/Collection'

const CollectionPage = () => {
  const isLoaded: boolean = useSelector(selectIsCollectionsLoaded);
  const [status, setStatus] = useState(false);

  useEffect(() => {
    setStatus(isLoaded);
  }, [isLoaded]);

  return (
    <div className="items">
      {status ?
        <Collection status={status} />
        :
        <NewSpinner />
      }
    </div>
  );
};

export default CollectionPage;
