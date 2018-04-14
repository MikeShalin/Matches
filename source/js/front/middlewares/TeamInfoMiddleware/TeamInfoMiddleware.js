import {requestTeamInfo,failureTeamInfo,successTeamInfo} from 'js/front/actions/TeamsActions/TeamsActions';
import socket from "js/connect/socket-connect/socket-connect";

const TeamInfoMiddleware = store => next => action => {
    if (
        action.type === requestTeamInfo.toString()
    ) {
        socket.emit('getTeamInfo',action.payload);
        socket.on("teamInfo",(res) => {
            if(res){
                console.log('получил с бэка ', res);
                // store.dispatch(successTeamInfo(res))
            } else {
                // store.dispatch(failureTeamInfo(res))
            }
        });
    }
    return next(action);
};

export default TeamInfoMiddleware;