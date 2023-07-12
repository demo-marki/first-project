import css from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus"

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader />
    }

    return (
        <div>
            {/*<div>
                <img src='https://www.fonstola.ru/pic/201904/1920x1200/fonstola.ru_325057.jpg'/>
            </div>*/}
            <div className={css.descriptionBlock}>
                <img src ={props.profile.photos.large} className={css.avatar} />
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;
