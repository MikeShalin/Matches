/**
 * Created by mike on 24.03.18.
 */
import rootReducer from 'js/front/reducers/index';
import MatchesListMiddleware from 'js/front/middlewares/MatchesListMiddleware';
import {createStore, applyMiddleware, compose} from 'redux';

export default initialState => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                MatchesListMiddleware
            ),
            window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        )
    );


    return store;
};

