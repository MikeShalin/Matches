import {requestTeams,failureTeams,successTeams} from 'js/front/actions/TeamsActions/TeamsActions';
import socket from 'js/connect/socket-connect/socket-connect';

const TeamsMiddleware = store => next => action => {
    if (
        action.type === requestTeams.toString()
    ) {
        socket.emit('getTeams');
        socket.on('teams',(res) => {
            if(res){
                store.dispatch(successTeams(res));
            } else {
                store.dispatch(failureTeams(res));
            }
        });
    }
    return next(action);
};

export default TeamsMiddleware;