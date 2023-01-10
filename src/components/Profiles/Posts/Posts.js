import React from "react";
import classes from "./Posts.module.css"





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

    let newPostElement = React.createRef();

    let addNewPost = () => {
        props.addNewPost();
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    };


    return (
        <section className={classes.container}>

            <div className={classes.formSendPost}>
                <form className={classes.formPost} action="#" name="post-form">
                    <label>Tell us your story:</label>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                    <button onClick={addNewPost} className={classes.btn}>ADD POST</button>
                </form>
            </div>

            <Post  postData={props.postData}/>

        </section>
    )
}

export default Posts