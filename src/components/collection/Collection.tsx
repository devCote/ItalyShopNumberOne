import { useSelector } from 'react-redux';
import CollectionItem from '../collection-item/collection-item';
import {
  selectCollectionByUrl,
} from '../../redux/shop/shop.selectors';
import './Collection.scss';
import CollectionAdmin from './collectionAdmin';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { selectAdminMode } from '../../redux/admin/admin.selector';


const Collection = () => {
  const history = useHistory();
  const match: { params: { sectionName: string } } = useRouteMatch();
  const sectionName = match.params.sectionName;

  const adminMode = useSelector(selectAdminMode);
  const collection: any = useSelector(selectCollectionByUrl(sectionName));
  const products = collection[0]

  const Empty = () => (
    <div className="empty_cont">
      <p className="empty">Empty</p>
    </div>
  );

  return (
    <div className="collection-page">
      <h2 className="title">{products?.title}</h2>
      <div className="items">
        {adminMode && <CollectionAdmin history={history} sectionName={sectionName} />}

        {products.items.length ? products?.items.map((item: any) => (
          <CollectionItem key={item.id} collectionName={sectionName} item={item} />))
          :
          <Empty />
        }
      </div>
    </div>
  );
}

export default Collection
