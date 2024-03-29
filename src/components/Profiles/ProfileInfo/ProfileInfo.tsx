import React, {ChangeEvent} from "react";

type PropsType = {
    status: string
    updateUserStatus: (status: string) => void
}

class ProfileStatus extends React.Component<PropsType>{

    state = {
        editMode: false,
        status: this.props.status,
    }

    activateEditMode(){
        this.setState({
            editMode: true
        } );
    }

    deactivateEditMode(){
        this.setState({
            editMode: false,
        } );

        this.props.updateUserStatus(this.state.status);
    }

    onStatusChange(e: ChangeEvent<HTMLInputElement>){
        this.setState({
            status: e.currentTarget.value
        })
    }

    render(){
        return <div>
            {!this.state.editMode &&

                <div onDoubleClick={this.activateEditMode.bind(this)} style={{color: 'red'}}><span>{!this.props.status ? 'I\'m not Status' : this.props.status}</span></div>
            }
            {this.state.editMode &&

                <div><input onChange={this.onStatusChange.bind(this)} onBlur={this.deactivateEditMode.bind(this)} type="text" value={this.state.status}/></div>
            }
        </div>
    }
}


export default ProfileStatus