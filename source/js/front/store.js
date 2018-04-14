import rootReducer from 'js/front/reducers/index';
import MatchesListMiddleware from 'js/front/middlewares/MatchesListMiddleware';
import TeamsMiddleware from 'js/front/middlewares/TeamsMiddleware';
import TeamInfoMiddleware from 'js/front/middlewares/TeamInfoMiddleware';
import SetIsFavoriteMiddleware from 'js/front/middlewares/SetIsFavoriteMiddleware';
import {createStore, applyMiddleware, compose} from 'redux';

export default initialState => {
    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(
                MatchesListMiddleware,
                TeamsMiddleware,
                TeamInfoMiddleware,
                SetIsFavoriteMiddleware
            )
        )
    );

    return store;
};

