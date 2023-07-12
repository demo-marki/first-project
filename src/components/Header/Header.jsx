import classes from './Header.module.css'
import {NavLink} from "react-router-dom";

const Header = (props) => {
    return (
        <header className={classes.header}>
            <img src='https://avatars.mds.yandex.net/i?id=372fe4724dfd316a56e042197e56d25266f58e35-7086222-images-thumbs&n=13' />
        <div className={classes.loginBlock}>
            {props.isAuth
                ? props.login
                : <NavLink to={'/login'}>Login</NavLink>
            }
        </div>
        </header>
    );
}

export default Header;