import classes from './Navbar.module.css'
import {NavLink} from "react-router-dom";

const SelectedLink = () => {
    return (
        select => select.isActive ? classes.active : classes.item
    );
}

const Navbar: React.FC = () => {
    return (
        <nav className={classes.nav}>
            <div className={`${classes.item} ${classes.active}`}>
                <NavLink to="/profile" className={SelectedLink()}>Profile</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/dialogs" className={SelectedLink()}>Messages</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/users" className={SelectedLink()}>Users</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/news" className={SelectedLink()}>News</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/music" className={SelectedLink()}>Music</NavLink>
            </div>
            <div className={classes.item}>
                <NavLink to="/settings" className={SelectedLink()}>Settings</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;