import React from "react";



class ProfileStatus extends React.Component{

    state = {
        editMode: false,
    }

    activateEditMode(){
        this.setState({
            editMode: true
        } );
    }

    deactivateEditMode(){
        this.setState({
            editMode: false
        } );
    }

    render(){
        return <div>
            {!this.state.editMode &&

                <div onDoubleClick={this.activateEditMode.bind(this)} style={{color: 'red'}}>{this.props.textStatus}</div>
            }
            {this.state.editMode &&

                <div><input onfocusin={true} onBlur={this.deactivateEditMode.bind(this)} type="text" value={this.props.textStatus}/></div>
            }
        </div>
    }
}


export default ProfileStatus