import {setIsFavorite} from 'js/front/actions/TeamsActions/TeamsActions';
import {successTeams} from 'js/front/actions/TeamsActions/TeamsActions';
import socket from "js/connect/socket-connect/socket-connect";

const SetIsFavoriteMiddleware = store => next => action => {
    if (
        action.type === setIsFavorite.toString()
    ) {
        const {Teams} = store.getState(),
            newState = Teams.map(team => {
                if(team.id === Number(action.payload.id)){
                    team.isFavorite = !team.isFavorite;
                    return team;
                } else {
                    return team
                }
            });
        socket.emit('setFavorite',action.payload);
        store.dispatch(successTeams(newState));
    }
    return next(action);
};

export default SetIsFavoriteMiddleware;