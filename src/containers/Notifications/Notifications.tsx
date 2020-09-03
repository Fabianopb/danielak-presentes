import React from "react";
import { connect } from "react-redux";

import Notifications from "react-notification-system-redux";

class NotificationsManager extends React.Component<
  Notifications.NotificationsProps
> {
  public render() {
    const { notifications } = this.props;
    return <Notifications notifications={notifications} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps, null)(NotificationsManager);
