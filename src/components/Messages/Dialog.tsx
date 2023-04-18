import React from "react";
import classes from "./Messages.module.css";
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

const Dialog: React.FC<PropsType> = (props) => {

    let path = `${props.id}`

    return <div className={classes.messDialog}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
}


export default  Dialog