import css from "./MyPosts.module.css";
import Post from "./Post/Post";
import {createRef} from "react"

const MyPosts = (props) => {

    let postsElements = props.posts.map(
        p => (<Post message={p.message} likescount={p.likesCount}/>)
    )

    let newPostElement = createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <div>
                <textarea onChange={onPostChange} ref={newPostElement}
                value={props.newPostText}/>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={css.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;
