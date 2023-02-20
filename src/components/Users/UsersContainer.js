import {connect} from "react-redux";
import Users from "./Users";
import {
    fromSubscribe,
    setCurrentPage,
    subscribe, toggleFollowingPogreess, getUsersThunkCreator,  followUser, unfollowUser
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {withAuthRedirect} from "../../hoc/AuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress, getIsAuthSelector,
    getIsFetcheng,
    getPageSize,
    getTotalUsers,
    getUsersSelector
} from "../../redux/users-selectors";




class UsersContainer extends React.Component{

    componentDidMount() {

        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);

    }

    onPageChanged = (pageNumber) => {

        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);

    }


    render() {
        return <>
            { this.props.isFetcheng ? <Preloader/> : null }
            <Users currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   subscribe={this.props.subscribe}
                   fromSubscribe={this.props.fromSubscribe}
                   followingInProgress={this.props.followingInProgress}
                   followUser={this.props.followUser}
                   unfollowUser={this.props.unfollowUser}

            />
        </>
    }
}

// const mapStateToProps = (state) => {
//     return {
//         users: state.pageUsers.users,
//         pageSize: state.pageUsers.pageSize,
//         totalUsersCount: state.pageUsers.totalUsersCount,
//         currentPage: state.pageUsers.currentPage,
//         isFetcheng: state.pageUsers.isFetcheng,
//         followingInProgress: state.pageUsers.followingInProgress,
//         isAuth: state.auth.isAuth,
//     }
// }


const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        isFetcheng: getIsFetcheng(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuthSelector(state),
        // isAuth: state.auth.isAuth,
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         subscribe: (userId) => {
//             dispatch(subscribeAC(userId))
//         },
//         fromSubscribe: (userId) => {
//             dispatch(fromSubscribeAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         setIsFetcheng: (isFetcheng) => {
//             dispatch(setIsFetchengAC(isFetcheng))
//         }
//     }
// }


// export default connect(mapStateToProps, {
//     subscribe,
//     fromSubscribe,
//     setCurrentPage,
//     toggleFollowingPogreess,
//     getUsersThunkCreator,
//     unfollowUser,
//     followUser,
// })(AuthRedirectComponent);


export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        subscribe,
        fromSubscribe,
        setCurrentPage,
        toggleFollowingPogreess,
        getUsersThunkCreator,
        unfollowUser,
        followUser,
    })
)(UsersContainer);
