import React, {Component} from 'react';
import {connect} from 'react-redux';
import {requestTeamInfo} from 'js/front/actions/TeamsActions/TeamsActions';
import {PopUp} from 'js/front/components/PopUp/PopUp';
import {Switch,Route,Link,Redirect,withRouter} from 'react-router-dom';

export class Team extends Component {
    handleClick = () =>{

        // console.log(id);
    };
    componentDidMount(){
        const {id} = this.props.match.params,
            {requestTeamInfo} = this.props;
        requestTeamInfo(id);
    }
    render() {
        const {isGettingTeamInfo,TeamInfo,Teams} = this.props,
              {teamScore,closeInScore,maxScore} = TeamInfo,
              teamsTitle=new Map(Teams.map(el=>[el.id,el.title]));
            console.log('closeInScore',TeamInfo);
            // console.log('teamScore',teamScore);
        return (
            <div>
                {isGettingTeamInfo ? <PopUp>Подождите идет загрузка...</PopUp> :
                    <div>
                        <div><strong>Информацию об играх за текущий период</strong></div>
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
        }
    }
};


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Team));

