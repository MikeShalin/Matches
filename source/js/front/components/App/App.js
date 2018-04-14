/**
 * Created by mike on 28.03.18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Switch,Route,Link,Redirect,withRouter} from 'react-router-dom';
import MatchesList from 'js/front/components/MatchesList';
import {Team} from 'js/front/components/Team/Team';
import {authFailure, authSuccess} from "../../actions/Auth/AuthActions";

export class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={MatchesList} />
                <Route path="/team/:id" component={Team} />
                <Redirect to="/" />
            </Switch>

        )
    }
}

const mapStateToProps = (state) =>{
    return{
        AuthSuccess:state.AuthSuccess
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        authSuccess: (user) => {
            dispatch(authSuccess(user));
        },
        authFailure: (bool) => {
            dispatch(authFailure(bool));
        },
        // handleEdit: (product) => {
        //     dispatch(handleEdit(product));
        // },
        // updateDoneRow: (ID) => {
        //     dispatch(updateDoneRow(ID));
        // },
        // deleteProduct: (ID) => {
        //     dispatch(deleteProduct(ID));
        // }
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
