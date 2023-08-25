import css from "./MyPosts.module.css";
import Post from "./Post/Post.tsx";
import React from "react";
import AddNewPostForm from "./AddPostForm/AddPostForm.tsx";
import {PostType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostType>
}

export type DispatchPropsType = {
    addPost: (text: string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = React.memo((props) => {

    let postsElements = props.posts.map(
        p => (<Post key={p.Id} message={p.message} likescount={p.likesCount}/>)
    )

    let onAddPost = (text: string) => {
        props.addPost(text);
    }

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost} />
            <div className={css.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const MyPostMemorized = React.memo(MyPosts)

export default MyPostMemorized;
