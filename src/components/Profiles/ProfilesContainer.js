import React from "react";
import Profile from "./Profiles";
import {connect} from "react-redux";
import {getUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";




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

        this.props.getUserProfile(userId);
    }



    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )

    }
}


let mapStateToProps = (state) => ({
    profile: state.pageProfile.profile,
});


export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withAuthRedirect,
    withRouter
)(ProfilesContainer);

