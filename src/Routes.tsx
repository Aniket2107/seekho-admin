import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddLanguage from "./pages/AddLanguage";
import AddVocab from "./pages/AddVocab";
import NotFound from "./pages/NotFound";

//Helpers
import PrivateRoute from "./private/PrivateRoute";
import ManageVocabs from "./pages/ManageVocabs";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/manage-vocabs" exact component={ManageVocabs} />
        <PrivateRoute path="/add-vocab" exact component={AddVocab} />
        <PrivateRoute path="/add-language" exact component={AddLanguage} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
