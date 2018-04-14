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
        // console.log('requestTeamInfo',this.props);
        // console.log('id',id);
        // requestTeamInfo(id);
    }
    render() {
        const {isGettingTeamInfo} = this.props;

        console.log('this.props',isGettingTeamInfo);
        return (

            <div>
                {isGettingTeamInfo ? <PopUp>Подождите идет загрузка...</PopUp> :
                    <div>
                        <div><strong>Информацию об играх за текущий период</strong></div>
                        <div><strong>Количество забитых голов</strong></div>
                        <div><strong>Количество пропущенных голов</strong></div>
                        <div><strong>Команду-конкурента, близкую по количеству очков за турнир</strong></div>
                        <div><strong>Команду с максимальным отрывом по очкам от данной</strong></div>
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
    console.log('state',state);
    return{
        TeamInfo: state.TeamInfo,
        isGettingTeamInfo: state.isGettingTeamInfo,
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

