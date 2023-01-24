import React from "react";
import classes from "./Posts.module.css"
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";





function Post(props) {

    let postOne = props.postData.map(p => <div key={p.id} className={`${classes.postTextOne} ${classes.postText}`}>{p.message} <div className={classes.postTextLikes}>Likes: {p.likesCount}</div></div>);

    return (
        <div className={classes.postItems}>
            <div className={classes.postItem}>
                {postOne}
            </div>
        </div>
    )
}


function Posts(props){


    let addNewPostText = (values) => {
        props.addNewPost(values.textMessagePost)
    }


    return (
        <section className={classes.container}>

            <PostReduxForm onSubmit={addNewPostText}/>

            <Post  postData={props.postData}/>

        </section>
    )
}

const maxLength30 = maxLengthCreator(30);

const PostsForm = (props) => {
    return (
        <div className={classes.formSendPost}>
            <form onSubmit={props.handleSubmit} className={classes.formPost}>
                <label>Tell us your story:</label>
                <Field validate={[required, maxLength30]} placeholder={'Ender text message....'} component={Textarea} name={'textMessagePost'}/>
                <button className={classes.btn}>ADD POST</button>
            </form>
        </div>
    )
}

const PostReduxForm = reduxForm ({
    form: 'posts'
})(PostsForm)

export default Posts