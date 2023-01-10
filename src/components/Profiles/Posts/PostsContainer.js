import {addPostActionCreate, updateNewPostTextActionCreate} from "../../../redux/profileReducer";
import Posts from "./Posts";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return {
        postData: state.pageProfile.postData,
        newPostText: state.pageProfile.newPostText,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNewPost: () => {
            dispatch(addPostActionCreate());
        },
        updateNewPostText: (text) => {
            dispatch(updateNewPostTextActionCreate(text));
        }
    }
}


const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);


export default PostsContainer;