import React, {useEffect, useState} from "react";



const ProfileStatusHook = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    const onStatusChange = (e) => {

        setStatus(e.currentTarget.value)
    }

        return <div>
            { !editMode &&

                <div onDoubleClick={activateEditMode} style={{color: 'red'}}><span>{props.status || 'I\'m not Status'}</span></div>
            }
            { editMode &&

                <div>
                    <input onChange={onStatusChange}
                            onfocusin={true}
                            onBlur={deactivateEditMode}
                            type="text"
                            value={status}/>
                </div>
            }
        </div>

}


export default ProfileStatusHook;