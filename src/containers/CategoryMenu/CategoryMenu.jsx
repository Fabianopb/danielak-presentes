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
    const { data } = this.props.categories;
    return (
      <div className={styles.menu}>
        {_.map(data, category => <div key={category._id}>{category.name}</div>)}
      </div>
    );
  }
}

CategoryMenu.propTypes = {
  categories: PropTypes.array.isRequired,
  fetchCategories: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  categories: state.categories
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchCategories}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CategoryMenu);
