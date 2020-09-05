import React from "react";
import ReactGA from "react-ga";
import { RouteProps } from "react-router-dom";
import { Location } from "history";

interface TrackerProps extends RouteProps {
  location: Location;
}

export default function withTracker(
  WrappedComponent: React.ComponentType,
  options = {}
) {
  const trackPage = (page: string) => {
    ReactGA.set({
      page,
      ...options,
    });
    ReactGA.pageview(page);
  };

  const HOC = class extends React.Component<TrackerProps> {
    public componentDidMount() {
      const {
        props: {
          location: { pathname, search },
        },
      } = this;
      trackPage(pathname + search);
    }

    public componentWillReceiveProps(nextProps: TrackerProps) {
      const {
        props: {
          location: { pathname: currentPath, search: currentSearch },
        },
      } = this;
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
