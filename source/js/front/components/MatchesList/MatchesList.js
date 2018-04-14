/**
 * Created by mike on 12.03.18.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestMatches} from 'js/front/actions/MatchesListActions/MatchesListActions';
import {PopUp} from 'js/front/components/PopUp/PopUp';
import {Switch,Route,Link,Redirect,withRouter} from 'react-router-dom';

export class MatchesList extends Component {
    componentDidMount(){
        const {requestMatches} = this.props;
        requestMatches();
    }
    render() {
        const {MatchesList,isGetting} = this.props;
        return (
            <div>
                {isGetting?<PopUp>Подождите идет загрузка...</PopUp>:<ul>
                    {MatchesList.map(match =>(
                        <li key={match.matchId}>
                            {console.log(match.teams.split(','))}
                            <strong>Матч {match.matchId}</strong> команды: {match.teams.split(',').map(team=>(
                            <div>
                                <Link to={`/team/${team}`} component="ShowPage">
                                    <em>{team}</em>
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
        MatchesList:state.MatchesList,
        isGetting:state.isGetting
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        requestMatches: () => {
            dispatch(requestMatches());
        }
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(MatchesList);
