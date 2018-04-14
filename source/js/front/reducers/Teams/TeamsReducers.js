import {successMatches} from 'js/front/actions/MatchesListActions/MatchesListActions';
import {handleAction, handleActions} from 'redux-actions';

export const Teams = handleAction(
    successMatches,
    (state, action) => action.payload,
    []
);

