import preloader from "../../../assets/images/preloader.gif";
import React from "react";
import classes from './Preloader.module.css'

const Preloader = (props) => {
    return <div>
        <img src={preloader} className={classes.preloaderImg}/>
    </div>
}

export default Preloader;