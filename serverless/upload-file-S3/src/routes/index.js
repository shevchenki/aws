import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router";
import displayScreen from "../components/displayScreen";
import uploadScreen from "../components/uploadScreen";

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path={"/"} component={uploadScreen} />
                <ProtectedRoute
                    path="/uploadScreen/"
                    component={uploadScreen}
                />
                <ProtectedRoute
                    path="/displayScreen/"
                    component={displayScreen}
                />
                <Route render={() => <Redirect to="/" />} />
            </Switch>
        );
    }
}

export default Routes;