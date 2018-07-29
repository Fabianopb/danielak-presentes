import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { fetchCategories } from '../../actions/categories';

import styles from './CategoryMenu.module.scss';

class CategoryMenu extends Component {
  componentDidMount () {
    this.props.fetchCategories();
  }

  render () {
    const { displayCategories } = this.props;
    const { data } = this.props.categories;
    return (
      <div className={styles.menu}>
        {displayCategories &&
          <div className={styles.itemsWrapper}>
            <div className={styles.menuItem}>Todas</div>
            {_.map(data, category => <div className={styles.menuItem} key={category._id}>{category.name}</div>)}
          </div>
        }
      </div>
    );
  }
}

CategoryMenu.propTypes = {
  categories: PropTypes.object.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  displayCategories: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchCategories}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
