import css from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo.tsx";
import MyPostsContainer from "./MyPosts/MyPostsContainer.tsx";
import {ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    saveAvatar: (file: File) => void,
    saveProfile: (profile: ProfileType, setStatus: () => void) => Promise<any>
}

const Profile: React.FC<PropsType> = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile} status={props.status}
                         saveAvatar={props.saveAvatar}
                         saveProfile={props.saveProfile}
                         isOwner={props.isOwner} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;