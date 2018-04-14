import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestTeamInfo,setIsFavorite} from 'js/front/actions/TeamsActions/TeamsActions';
import {PopUp} from 'js/front/components/PopUp/PopUp';
import {Switch,Route,Link,Redirect,withRouter} from 'react-router-dom';

export class Team extends Component {
    constructor(props){
        super(props);
        this.state = {
            popUpShow:false,
            popUp:'Команда добавлена в любимые',
        }
    }
    handleClick = () =>{
        const {id} = this.props.match.params,
            {setIsFavorite,Teams} = this.props,
            isFavorite = Teams.filter(el=>(el.id===Number(id)))[0].isFavorite;
        setIsFavorite({
            id,
            isFavorite
        });
        this.setState({
            popUpShow:true,
            popUp:Number(isFavorite)?'Команда удалена из любимых':'Команда добавлена в любимые',
        });
    };
    componentDidMount(){
        const {id} = this.props.match.params,
            {requestTeamInfo} = this.props;
        requestTeamInfo(id);
    }
    render() {
        const {isGettingTeamInfo,TeamInfo,Teams} = this.props,
              {teamScore,closeInScore,maxScore,matchesInfo} = TeamInfo,
              {popUpShow,popUp} = this.state,
              teamsTitle = new Map(Teams.map(el=>[el.id,el.title]));
        return (
            <div>
                {isGettingTeamInfo ? <PopUp>Подождите идет загрузка...</PopUp> :
                    <div>
                        <div><strong>Информацию об играх за текущий период</strong>
                            <ul>
                                {matchesInfo?matchesInfo.map(match => (
                                    <li key={match.matchId}>
                                        <strong>Матч {match.matchId}</strong>,
                                        играли команды: {match.teams}
                                    </li>
                                )):null}
                            </ul>
                        </div>
                        <div><strong>Количество забитых голов:</strong><em>{teamScore.score}</em></div>
                        <div><strong>Количество пропущенных голов:</strong><em>{teamScore.missed}</em></div>
                        <div><strong>Команды-конкуренты, близкие по количеству очков за турнир:</strong>
                            <ul>
                                {closeInScore?closeInScore.map(team => (
                                    <li key={team.teamId}>
                                        <strong>Команда {teamsTitle.get(team.teamId)}</strong>, кол-во забитых
                                        мячей: {team.score}
                                    </li>
                                )):null}
                            </ul>
                        </div>
                        <div><strong>Команду с максимальным отрывом по очкам от данной:</strong>Команда {teamsTitle.get(maxScore.teamId)}</div> с результатом {maxScore.score}
                        <div>
                            <button onClick={this.handleClick}>Сделать команду любимой</button>
                        </div>
                        {popUpShow?<PopUp>{popUp}</PopUp>:''}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        TeamInfo: state.TeamInfo,
        isGettingTeamInfo: state.isGettingTeamInfo,
        Teams: state.Teams
    }
};

const mapDispatchToProps = (dispatch) =>{
    return {
        requestTeamInfo: (teamId) =>{
            dispatch(requestTeamInfo(teamId));
        },
        setIsFavorite: (id) =>{
            dispatch(setIsFavorite(id));
        }
    }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Team));

