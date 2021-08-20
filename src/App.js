import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import Login from "./Auth/LoginReg";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signin" component={Login} />
          <PrivateRoute component={Dashboard} path="/" exact />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
