import {useSelector} from "react-redux";
import Users from "./Users";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import {
    getIsFetcheng,
} from "../../redux/users-selectors";



type UserPagePropsType = {

}

export const UsersPage: React.FC<UserPagePropsType> = (props) => {

    const isFetcheng = useSelector(getIsFetcheng)

    return <>
        {isFetcheng ? <Preloader/> : null}
        <Users/>
    </>
}


