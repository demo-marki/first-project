import css from "./Post.module.css";

type PropsType = {
    message: string
    likesCount: number
}

const Post: React.FC<PropsType> = (props) => {

    return (
        <div className={css.item}>
            <img src='https://avatars.mds.yandex.net/i?id=263fddb8296e009c40006fc77ab52919439da949-9025626-images-thumbs&n=13' alt=""/>
            {props.message}
            <div>
                <span>like</span> {props.likesCount}
            </div>
        </div>
    )
}

export default Post;
