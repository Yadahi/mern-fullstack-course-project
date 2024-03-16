import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Users from "./user/pages/Users";

const App = () => {
  return (
    <Router>
      <Route path="/">
        <Users />
      </Route>
    </Router>
  );
};

export default App;
