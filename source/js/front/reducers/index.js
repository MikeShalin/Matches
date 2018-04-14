import {combineReducers} from 'redux';
import {MatchesList,isGettingMatches} from 'js/front/reducers/MatchesList/MatchesListReducers';
import {Teams,isGettingTeams} from 'js/front/reducers/Teams/TeamsReducers';
import {TeamInfo,isGettingTeamInfo} from 'js/front/reducers/TeamInfo/TeamInfoReducers';

export default combineReducers({
    MatchesList,
    isGettingMatches,
    Teams,
    isGettingTeams,
    TeamInfo,
    isGettingTeamInfo
});
