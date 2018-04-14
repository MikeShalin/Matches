import {createActions} from 'redux-actions';

export const {
    requestTeams:requestTeams,
    failureTeams:failureTeams,
    successTeams:successTeams,
    requestTeamInfo:requestTeamInfo,
    failureTeamInfo:failureTeamInfo,
    successTeamInfo:successTeamInfo,
} = createActions({

    REQUEST_TEAMS: undefined,

    FAILURE_TEAMS: undefined,

    SUCCESS_TEAMS: teams => teams,

    REQUEST_TEAM_INFO: teamId => teamId,

    FAILURE_TEAM_INFO: undefined,

    SUCCESS_TEAM_INFO: info => info,
});
