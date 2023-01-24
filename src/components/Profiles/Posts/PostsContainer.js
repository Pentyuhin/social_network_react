import {addPostActionCreate} from "../../../redux/profileReducer";
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
        addNewPost: (textMessagePost) => {
            dispatch(addPostActionCreate(textMessagePost));
        }
    }
}


const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);


export default PostsContainer;