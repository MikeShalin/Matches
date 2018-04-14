import {successMatches,requestMatches,failureMatches} from 'js/front/actions/MatchesListActions/MatchesListActions';
import {handleAction, handleActions} from 'redux-actions';

export const MatchesList = handleAction(
    successMatches,
    (state, action) => action.payload,
    []
);

export const isGetting=handleActions(
    {
        [requestMatches]:()=>true,
        [successMatches]:()=>false,
    },
    false
);
