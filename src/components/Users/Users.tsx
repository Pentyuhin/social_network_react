import React, {useEffect} from "react";
import classes from './Users.module.css'
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserSearchForm} from "./UserSearchForm";
import {FilterType, getUsersThunkCreator} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsers,
    getUsersFilter,
    getUsersSelector
} from "../../redux/users-selectors";


type PropsType = {
    portionSize?: number
}

export const Users: React.FC<PropsType> = React.memo((props) => {

    const totalUsersCount = useSelector(getTotalUsers)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsersSelector)
    const followingInProgress = useSelector(getFollowingInProgress)



    const dispatch = useDispatch()


    useEffect(() => {
        dispatch<any>(getUsersThunkCreator(currentPage, pageSize, filter));
    }, [])


    const onPageChanged = (pageNumber: number) => {
        dispatch<any>(getUsersThunkCreator(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch<any>(getUsersThunkCreator(1, pageSize, filter));
    }

    const unfollowUser = (userId: number) => {
        dispatch<any>(unfollowUser(userId));
    }

    const followUser = (userId: number) => {
        dispatch<any>(followUser(userId));
    }


    return <div className={classes.pageUser}>

        <UserSearchForm onFilterChanged={onFilterChanged}/>

        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   pageSize={pageSize}
                   totalUsersCount={totalUsersCount}/>


        {
            users.map((user) => <User
                user={user}
                followingInProgress={followingInProgress}
                unfollowUser={unfollowUser}
                followUser={followUser}
                key={user.id}/>
            )
        }
    </div>
})


export default Users;