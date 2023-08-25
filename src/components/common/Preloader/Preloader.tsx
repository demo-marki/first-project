import preloader from "../../../assets/images/preloader.gif";
import React from "react";
import classes from './Preloader.module.css'

const Preloader: React.FC = () => {
    return <div>
        <img src={preloader} className={classes.preloaderImg} alt=""/>
    </div>
}

export default Preloader;