import React from "react";
import axios from "axios";
import Profile from "./Profiles";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {userAPI} from "../../api/api";



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
        // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId, {
        //     withCredentials: true,
        // })
        //     .then(response => {
        //         this.props.setUserProfile(response.data);
        //     });

        userAPI.getUserId(userId)
            .then(data => {
                debugger;
                this.props.setUserProfile(data);
            })
    }



    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )

    }
}


let mapStateToProps = (state) => ({
    profile: state.pageProfile.profile
});




let WithUrlDataContainerComponent = withRouter(ProfilesContainer);


export default connect(mapStateToProps, {
    setUserProfile
}) (WithUrlDataContainerComponent);