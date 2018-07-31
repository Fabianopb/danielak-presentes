import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { fetchCategories, changeCategory } from '../../actions/categories';

import styles from './CategoryMenu.module.scss';

class CategoryMenu extends Component {
  componentDidMount () {
    this.props.fetchCategories();
  }

  handleCategoryChange = (categoryId) => {
    if (categoryId !== this.props.categories.activeCategory) {
      this.props.changeCategory(categoryId);
    }
  }

  render () {
    const { data, activeCategory } = this.props.categories;
    return (
      <div className={styles.menu}>
        <div className={styles.itemsWrapper}>
          <div
            className={classNames(styles.menuItem, { [styles.activeItem]: !activeCategory })}
            onClick={() => this.handleCategoryChange(null)}
          >Todas
          </div>
          {_.map(data, category =>
            <div
              key={category._id}
              className={classNames(styles.menuItem, { [styles.activeItem]: activeCategory === category._id })}
              onClick={() => this.handleCategoryChange(category._id)}
            >{category.name}
            </div>
          )}
        </div>
      </div>
    );
  }
}

CategoryMenu.propTypes = {
  categories: PropTypes.object.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  changeCategory: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchCategories, changeCategory}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
