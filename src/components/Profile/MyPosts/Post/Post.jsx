import css from "./Post.module.css";

const Post = (props) => {

    return (
        <div className={css.item}>
            <img src='https://avatars.mds.yandex.net/i?id=263fddb8296e009c40006fc77ab52919439da949-9025626-images-thumbs&n=13'/>
            {props.message}
            <div>
                <span>like</span> {props.likescount}
            </div>
        </div>
    )
}

export default Post;
