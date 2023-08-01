import css from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = ({profile, status, updateStatus}) => {
    if (!profile){
        return <Preloader />
    }

    return (
        <div>
            {/*<div>
                <img src='https://www.fonstola.ru/pic/201904/1920x1200/fonstola.ru_325057.jpg'/>
            </div>*/}
            <div className={css.descriptionBlock}>
                <img src ={profile.photos.large} className={css.avatar} />
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>
    )
}

export default ProfileInfo;
