import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestMatches} from 'js/front/actions/MatchesListActions/MatchesListActions';
import {requestTeams} from 'js/front/actions/TeamsActions/TeamsActions';
import {PopUp} from 'js/front/components/PopUp/PopUp';
import Team from 'js/front/components/Team/';
import {Switch,Route,Link,Redirect,withRouter} from 'react-router-dom';

export class MatchesList extends Component {
    componentDidMount(){
        const {requestMatches,requestTeams} = this.props;
        requestTeams();
        requestMatches();
    }
    render() {
        const {MatchesList,isGettingMatches,Teams} = this.props,
            teamsTitle=new Map(Teams.map(el=>[el.id,el.title])),
            teamsIsFavorite=new Map(Teams.map(el=>[el.id,el.isFavorite]));
        //
        return (
            <div>
                {isGettingMatches?<PopUp>Подождите идет загрузка...</PopUp>:<ul>
                    {MatchesList.map(match =>(
                        <li key={match.matchId}>
                            <strong>Матч {match.matchId}</strong> команды: {match.teams.split(',').map(team=>(
                            <div className={teamsIsFavorite.get(Number(team))?'checked':''}>
                                <Link to={`/team/${team}`} component={Team}>
                                    <em>{teamsTitle.get(Number(team))}</em>
                                </Link>
                            </div>
                        ))}
                        </li>
                    ))}
                </ul>}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        MatchesList: state.MatchesList,
        isGettingMatches: state.isGettingMatches,
        isGettingTeams: state.isGettingTeams,
        Teams: state.Teams
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        requestMatches: () =>{
            dispatch(requestMatches());
        },
        requestTeams: () =>{
            dispatch(requestTeams());
        }
    }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MatchesList));
