
import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import MatchesList from 'js/front/components/MatchesList';
import Team from 'js/front/components/Team/';

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={MatchesList} />
                <Route path="/team" component={Team} />
                    <Route path="/team/:id" component={Team}>
                </Route>
                <Redirect to="/" />
            </Switch>

        )
    }
}

export default App;