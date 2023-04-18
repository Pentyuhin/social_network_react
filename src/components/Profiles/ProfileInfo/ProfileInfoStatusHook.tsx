import React, {ChangeEvent, useEffect, useState} from "react";


type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

const ProfileStatusHook: React.FC<PropsType> = (props) => {
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

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {

        setStatus(e.currentTarget.value)
    }

        return <div>
            { !editMode &&

                <div onDoubleClick={activateEditMode} style={{color: 'red'}}><span>{props.status || 'I\'m not Status'}</span></div>
            }
            { editMode &&

                <div>
                    <input  onChange={onStatusChange}
                            autoFocus={true}
                            onBlur={deactivateEditMode}
                            type="text"
                            value={status}/>
                </div>
            }
        </div>

}


export default ProfileStatusHook;