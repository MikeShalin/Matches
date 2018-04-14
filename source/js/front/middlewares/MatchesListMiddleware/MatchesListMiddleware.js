import {requestMatches,failureMatches,successMatches} from 'js/front/actions/MatchesListActions/MatchesListActions';
import socket from "js/connect/socket-connect/socket-connect";

const MatchesListMiddleware = store => next => action => {
    if (
        action.type === requestMatches.toString()
    ) {
        //1 - это id турнира
        socket.emit('getMatchesList');
        socket.emit('getTeams');
        socket.on("matchesList",(res) => {
            if(res){
                store.dispatch(successMatches(res))
            } else {
                store.dispatch(failureMatches(res))
            }
        });
    }
    return next(action);
};

export default MatchesListMiddleware;