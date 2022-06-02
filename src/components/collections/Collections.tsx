import React, { useState, useEffect } from 'react';
import './Collections.scss';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectDirectorySection,
  selectIsDirectoryLoaded,
} from '../../redux/directory/directory.selectors';
import { selectAdminMode } from '../../redux/admin/admin.selector';
import AdminBtns from '../admin/AdminBtns';
import NewSpinner from '../new-spinner/NewSpinner';
import CollectionsAdmin from './CollectionsAdmin';

const Collection = () => {
  const isLoaded = useSelector(selectIsDirectoryLoaded);
  const [currentStatus, setCurrentStatus] = useState(isLoaded);

  const directory = useSelector(selectDirectorySection);
  const adminMode = useSelector(selectAdminMode);
  const history = useHistory();

  useEffect(() => {
    setCurrentStatus(isLoaded);
  }, [isLoaded]);

  return (
    <React.Fragment>
      {currentStatus ? (
        <div className="menu container">
          {adminMode && <CollectionsAdmin history={history} />}
          {directory.map((section: any) => (
            <div key={section.id} className="collection-item">
              <Link
                className="image"
                to={'/shop/' + section.url}
              >
                <img
                  src={section.imageUrl}
                  alt="card pic"
                />
              </Link>
              <Link
                className="header-text"
                to={'/shop/' + section.url}
              >
                <div className="content-text">{section.title}</div>
              </Link>
              <AdminBtns
                item={section}
                editLink={`/admin/editsection/${section.url}`}
                fireColl={'sections'}
                isCollection
              />
            </div>
          ))}
        </div>
      ) : (
        <NewSpinner />
      )}
    </React.Fragment>
  );
};

export default Collection;
