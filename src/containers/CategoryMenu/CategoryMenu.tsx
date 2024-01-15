import { Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { useQueryParams, StringParam } from 'use-query-params';
import styles from './CategoryMenu.module.scss';
import { categories } from '../../data/categories';

const CategoryMenu = () => {
  const [query, setQuery] = useQueryParams({ categoryId: StringParam });

  const history = useHistory();
  const location = useLocation();

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
              categories.map((category) => (
                <div
                  key={category.id}
                  className={classNames(styles.menuItem, {
                    [styles.activeItem]: isRoot && query.categoryId === category.id,
                  })}
                  onClick={() => navigateToCategory(category.id)}
                >
                  {category.name}
                </div>
              ))}
          </div>
          <div className={styles.menuItem} onClick={() => history.push('/about')}>
            Contato
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default CategoryMenu;
