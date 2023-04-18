import {actions} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";




const mapStateToProps = (state: AppStateType) => {
    return {
        postData: state.pageProfile.postData,
        // newPostText: state.pageProfile.newPostText,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addNewPost: (textMessagePost: string) => {
            dispatch(actions.addPostActionCreate(textMessagePost));
        }
    }
}


const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);


export default PostsContainer;