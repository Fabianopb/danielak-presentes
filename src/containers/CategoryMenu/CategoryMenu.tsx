import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import useSWR from 'swr';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams, StringParam } from 'use-query-params';
import { isAdminPage } from '../../modules/helpers';
import styles from './CategoryMenu.module.scss';
import { fetchCategories } from '../../api';
import { clearSession } from '../../modules/session';

const CategoryMenu = () => {
  const [query, setQuery] = useQueryParams({ categoryId: StringParam });

  const history = useHistory();
  const location = useLocation();

  const { data: categories } = useSWR('/categories', fetchCategories);

  const isRoot = location.pathname === '/';

  const navigateToCategory = (categoryId?: string) => {
    if (!isRoot) {
      history.push('/');
    }
    setQuery({ categoryId });
  };

  return (
    <Row center="xs" className={styles.menu}>
      <Col xs={12} lg={8}>
        <div className={styles.itemsWrapper}>
          {!isAdminPage(window.location.pathname) && (
            <>
              <div className={styles.categories}>
                <div
                  className={classNames(styles.menuItem, {
                    [styles.activeItem]: isRoot && !query.categoryId,
                  })}
                  onClick={() => navigateToCategory(undefined)}
                >
                  Home
                </div>
                {categories &&
                  categories.map(category => (
                    <div
                      key={category._id}
                      className={classNames(styles.menuItem, {
                        [styles.activeItem]: isRoot && query.categoryId === category._id,
                      })}
                      onClick={() => navigateToCategory(category._id)}
                    >
                      {category.name}
                    </div>
                  ))}
              </div>
              <div className={styles.menuItem} onClick={() => history.push('/about')}>
                Contato
              </div>
            </>
          )}
          {isAdminPage(window.location.pathname) && (
            <div
              className={styles.menuItem}
              onClick={() => {
                clearSession();
                history.push('/');
              }}
            >
              Logout
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default CategoryMenu;
