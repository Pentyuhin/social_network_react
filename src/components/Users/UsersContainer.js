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
import axios from "axios";
import Preloader from "../common/Preloader/Preloader";



class UsersContainer extends React.Component{

    componentDidMount() {
        this.props.setIsFetcheng(true);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetcheng(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setIsFetcheng(true);
        this.props.setCurrentPage(pageNumber)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setIsFetcheng(false);
                this.props.setUsers(response.data.items);
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


