import React from "react";
import { connect } from "react-redux";

import Notifications from "react-notification-system-redux";

const NotificationsManager = ({
  notifications,
}: Notifications.NotificationsProps) => (
  <Notifications notifications={notifications} />
);

const mapStateToProps = (state: RootState) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, null)(NotificationsManager);
