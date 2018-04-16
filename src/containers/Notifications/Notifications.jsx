import React from 'react';
import { PropTypes } from 'prop-types';
import {connect} from 'react-redux';

import Notifications from 'react-notification-system-redux';

class NotificationsManager extends React.Component {
  render () {
    const {notifications} = this.props;
    return (
      <Notifications
        notifications={notifications}
      />
    );
  }
}

NotificationsManager.propTypes = {
  notifications: PropTypes.array
};

const mapStateToProps = (state) => ({
  notifications: state.notifications
});

export default connect(mapStateToProps, {})(NotificationsManager);
