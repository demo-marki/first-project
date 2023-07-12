import css from './DialogItem.module.css'
import {NavLink} from "react-router-dom";

const SelectClass = () => {
    return x => x.isActive ? css.active : css.item;
}

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id;
    return (
        <div className={css.dialog}>
            <NavLink className={SelectClass()} to={path}>{props.name}</NavLink>
        </div>
    );
}

export default DialogItem;