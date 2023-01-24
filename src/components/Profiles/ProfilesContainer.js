import React from "react";
import Profile from "./Profiles";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, updateUserStatus} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
// import {withAuthRedirect} from "../../hoc/AuthRedirect"; Не используем в данным момент




function withRouter(Component){
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props} router={{location, navigate, params}}/>
        )
    }
    return ComponentWithRouterProp;
}


class ProfilesContainer extends React.Component{

    componentDidMount() {
        let userId = this.props.router.params.userId;

        if(!userId){
            userId = 1049;
        }

        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }
    }



    render() {
        return (
            <Profile {...this.props} profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        )

    }
}


let mapStateToProps = (state) => ({
    profile: state.pageProfile.profile,
    status: state.pageProfile.status,
});


export default compose(
    connect(mapStateToProps, {getUserProfile,
        getUserStatus, updateUserStatus}),
    // withAuthRedirect, Не используем в данным момент
    withRouter
)(ProfilesContainer);

