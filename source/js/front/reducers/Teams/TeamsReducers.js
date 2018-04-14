import {successTeams,failureTeams,requestTeams} from 'js/front/actions/TeamsActions/TeamsActions';
import {handleAction, handleActions} from 'redux-actions';

export const Teams = handleAction(
    successTeams,
    (state, action) => action.payload,
    []
);

export const isGettingTeams=handleActions(
    {
        [requestTeams]:() => true,
        [failureTeams]:() => false,
        [successTeams]:() => false,
    },
    false
);
