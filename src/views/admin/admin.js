import React, { Component } from 'react';

import './admin.css';

class AdminView extends Component {

  render() {
    return (
      <div>
        <div className="admin-bar">
          DaniK - Admin View
        </div>
        <div className="product-list">
          { /* this.state.products */ }
        </div>
      </div>
    );
  }
}

export default AdminView;
