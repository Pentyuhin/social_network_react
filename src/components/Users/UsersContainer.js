import {connect} from "react-redux";
import Users from "./Users";
import {
    fromSubscribe,
    setCurrentPage, setIsFetcheng,
    setUsers,
    setTotalUsersCount,
    subscribe
} from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {userAPI} from "../../api/api";



class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.setIsFetcheng(true);

        userAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.setIsFetcheng(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setIsFetcheng(true);
        this.props.setCurrentPage(pageNumber)

        userAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.setIsFetcheng(false);
                this.props.setUsers(data.items);
            });
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

            />
        </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.pageUsers.users,
        pageSize: state.pageUsers.pageSize,
        totalUsersCount: state.pageUsers.totalUsersCount,
        currentPage: state.pageUsers.currentPage,
        isFetcheng: state.pageUsers.isFetcheng,
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


export default connect(mapStateToProps, {
    subscribe,
    fromSubscribe,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    setIsFetcheng,
})(UsersContainer);


