import { Redirect, Route, RouteProps } from "react-router-dom";

import { isAuthenticated } from "./helper";

export default function PrivateRoute({ ...routeProps }: RouteProps) {
  if (isAuthenticated() && isAuthenticated().user.isAdmin) {
    return <Route {...routeProps} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
