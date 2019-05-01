import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import Profile from "../components/profile";
import Login from "../components/login";
import PrivateRoute from "../components/privateRoute";

const Pro = () => (
  <Layout>
    <Router>
      <PrivateRoute path="/pro/profile" component={Profile} />
      <Login path="/pro/login" />
    </Router>
  </Layout>
);

export default Pro;
