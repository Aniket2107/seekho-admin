import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Pages
import LandingPage from "./pages/Public/LandingPage";
import Login from "./pages/Public/Login";
import Contactus from "./pages/Public/Contactus";
import Aboutus from "./pages/Public/Aboutus";
import Dashboard from "./pages/Admin/Dashboard";
import AddLanguage from "./pages/Admin/AddLanguage";
import AddVocab from "./pages/Admin/AddVocab";
import Addquestion from "./pages/Admin/Addquestion";
import EditVocab from "./pages/Admin/EditVocab";
import Editquestion from "./pages/Admin/Editquestion";
import Feedbacks from "./pages/Admin/Feedbacks";
import NotFound from "./pages/Public/NotFound";

import ManageVocabs from "./pages/Admin/manage/ManageVocabs";
import Managequestion from "./pages/Admin/manage/Managequestion";
import Managelanguages from "./pages/Admin/manage/Managelanguages";
import ManageUser from "./pages/Admin/manage/ManageUser";

//Helpers
import PrivateRoute from "./private/PrivateRoute";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/login" exact component={Login} />
        <Route path="/contact-us" exact component={Contactus} />
        <Route path="/about-us" exact component={Aboutus} />
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
        <PrivateRoute
          path="/edit-question/:questionId"
          exact
          component={Editquestion}
        />
        <PrivateRoute path="/manage-users" exact component={ManageUser} />
        <PrivateRoute path="/feedbacks" exact component={Feedbacks} />
        <Route path="*" exact component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
