import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddLanguage from "./pages/AddLanguage";
import AddVocab from "./pages/AddVocab";
import Addquestion from "./pages/Addquestion";
import EditVocab from "./pages/EditVocab";
import NotFound from "./pages/NotFound";

import ManageVocabs from "./pages/ManageVocabs";
import Managequestion from "./pages/Managequestion";
import Managelanguages from "./pages/Managelanguages";

//Helpers
import PrivateRoute from "./private/PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/manage-vocabs" exact component={ManageVocabs} />
        <PrivateRoute path="/add-vocab" exact component={AddVocab} />
        <PrivateRoute path="/edit-vocab/:vocabId" exact component={EditVocab} />
        <PrivateRoute path="/add-language" exact component={AddLanguage} />
        <PrivateRoute
          path="/manage-languages"
          exact
          component={Managelanguages}
        />
        <PrivateRoute path="/add-question" exact component={Addquestion} />
        <PrivateRoute
          path="/manage-questions"
          exact
          component={Managequestion}
        />

        <Route path="*" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
