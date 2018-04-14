import {successTeamInfo,failureTeamInfo,requestTeamInfo} from 'js/front/actions/TeamsActions/TeamsActions';
import {handleAction, handleActions} from 'redux-actions';

export const TeamInfo = handleAction(
    successTeamInfo,
    (state, action) => action.payload,
    []
);

export const isGettingTeamInfo = handleActions(
    {
        [requestTeamInfo]:() => true,
        [failureTeamInfo]:() => false,
        [successTeamInfo]:() => false,
    },
    true
);
