import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import useSWR from 'swr';
// import { useHistory } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { isAdminPage } from '../../modules/helpers';
import styles from './NewCategoryMenu.module.scss';
import { fetchCategories } from '../../api';

const NewCategoryMenu = () => {
  const { data: categories } = useSWR('/categories', fetchCategories);

  const [categoryId, setCategoryId] = useQueryParam('categoryId', StringParam);

  // useEffect(() => {
  //   if (router.location.search) {
  //     productActions.fetchProducts();
  //   }
  // }, [router.location.search, productActions]);

  const isRoot = window.location.pathname === '/';
  return (
    <Row center="xs" className={styles.menu}>
      <Col xs={12} lg={8}>
        <div className={styles.itemsWrapper}>
          {!isAdminPage(window.location.pathname) && (
            <>
              <div className={styles.categories}>
                <div
                  className={classNames(styles.menuItem, {
                    [styles.activeItem]: isRoot && !categoryId,
                  })}
                  onClick={() => setCategoryId(undefined)}
                >
                  Home
                </div>
                {categories &&
                  categories.map(category => (
                    <div
                      key={category._id}
                      className={classNames(styles.menuItem, {
                        [styles.activeItem]: isRoot && categoryId === category._id,
                      })}
                      onClick={() => setCategoryId(category._id)}
                    >
                      {category.name}
                    </div>
                  ))}
              </div>
              {/* <div className={styles.menuItem} onClick={() => routerActions.push('/about')}>
                Contato
              </div> */}
            </>
          )}
          {/* {isAdminPage(window.location.pathname) && (
            <div className={styles.menuItem} onClick={userActions.logout}>
              Logout
            </div>
          )} */}
        </div>
      </Col>
    </Row>
  );
};

export default NewCategoryMenu;
