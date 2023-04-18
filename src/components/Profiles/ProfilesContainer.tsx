import React, {ComponentType} from "react";
import Profile from "./Profiles";
import {connect} from "react-redux";
import {getUserProfile, getUserStatus, savePhoto, saveProfile, updateUserStatus} from "../../redux/profileReducer";
import {useLocation, useNavigate, useParams,} from "react-router-dom";
import {compose} from "redux";
import {profileType} from "../../Types/types";
import {AppStateType} from "../../redux/redux-store";
// import {withAuthRedirect} from "../../hoc/AuthRedirect"; Не используем в данным момент

type MapPropsType = {
    profile: profileType
    status: string
    authorizedUserId: number
    isAuth: boolean
    router: any
    history: any
}
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => string
    savePhoto: (file: File) => void
    saveProfile: (profile: profileType) => Promise<any>

}



type PropsType = MapPropsType & DispatchPropsType;

class ProfilesContainer extends React.Component<PropsType>{

    refreshProfile() {
        let userId: number | null = +this.props.router.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                // todo: may be replace push with Redirect??
                this.props.history.push("/login");
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            this.props.getUserProfile(userId)
            this.props.getUserStatus(userId)
        }
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: Readonly<MapPropsType> , prevState:Readonly<DispatchPropsType>): void{

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

                     profile={this.props.profile}
                     status={this.props.status}


            />

        )

    }
}

export interface WithRouterProps {
    location: ReturnType<typeof useLocation>;
    params: Record<string, string>;
    navigate: ReturnType<typeof useNavigate>;
}

export function withRouter<Props extends WithRouterProps>(Component: React.ComponentType<Props>){
    function ComponentWithRouterProp(props: Omit<Props, keyof WithRouterProps>) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component {...props as Props} router={{location, navigate, params }}/>
        )
    }
    return ComponentWithRouterProp;
}


let mapStateToProps = (state: AppStateType) => ({
    profile: state.pageProfile.profile,
    status: state.pageProfile.status,
    authorizedUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
});


export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile,
        getUserStatus, updateUserStatus, savePhoto, saveProfile}),
    // withAuthRedirect, Не используем в данным момент
    withRouter
)(ProfilesContainer);

