import React from "react";
import Profile from "./Profiles";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {compose} from "redux";
// import {withAuthRedirect} from "../../hoc/AuthRedirect"; Не используем в данным момент



class ProfilesContainer extends React.Component{

    refreshProfile() {
        let userId = this.props.router.params.userId;
        if(!userId){
            userId = this.props.authorizedUserId;
            if(!userId){
                return this.props.history.push('/login');
            }
        }
        this.props.getUserProfile(userId);
        this.props.getUserStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState) {

        if(prevProps.status !== this.props.status){
            this.setState({
                status: this.props.status
            });
        }

        if( this.props.router.params.userId !== prevProps.router.params.userId ){
            this.refreshProfile();
        }
    }


    render() {
        return (
            <Profile {...this.props}
                     updateUserStatus={this.props.updateUserStatus}
                     isOwner={!this.props.router.params.userId}
                     savePhoto={this.props.savePhoto}
            />

        )

    }
}

export function withRouter(Component){
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


let mapStateToProps = (state) => ({
    profile: state.pageProfile.profile,
    status: state.pageProfile.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});


export default compose(
    connect(mapStateToProps, {getUserProfile,
        getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    // withAuthRedirect, Не используем в данным момент
    withRouter
)(ProfilesContainer);

