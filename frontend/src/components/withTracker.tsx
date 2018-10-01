import * as React from 'react';
import * as ReactGA from 'react-ga';
import { RouteProps } from 'react-router-dom';
import { Location } from 'history';

interface TrackerProps extends RouteProps {
  location: Location;
}

export default function withTracker(WrappedComponent: React.ComponentType, options = {}) {
  const trackPage = (page: string) => {
    ReactGA.set({
      page,
      ...options
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends React.Component<TrackerProps> {
    public componentDidMount() {
      const { pathname, search } = this.props.location;
      trackPage(pathname + search);
    }

    public componentWillReceiveProps(nextProps: TrackerProps) {
      const { pathname: currentPath, search: currentSearch } = this.props.location;
      const { pathname: nextPath, search: nextSearch } = nextProps.location;
      if (currentPath + currentSearch !== nextPath + nextSearch) {
        trackPage(nextPath + nextSearch);
      }
    }

    public render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}
