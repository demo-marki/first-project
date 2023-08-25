import css from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader.tsx";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks.tsx";
import userPhoto from "../../../assets/images/defaultuser.png"
import {ChangeEvent, useState} from "react";
import ProfileDataForm from "./ProfileDataForm.tsx";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    saveAvatar: (file: File) => void,
    saveProfile: (profile: ProfileType, setStatus: () => void) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, saveAvatar, saveProfile}) => {
    let [editMode, setEditMode] = useState(false);
    if (!profile){
        return <Preloader />
    }

    const onAvatarSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files.length){
            saveAvatar(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType, setStatus: () => void) => {
        saveProfile(formData, setStatus).then(() => {
                setEditMode(false);
        });
    }

    return (
        <div>
            {/*<div>
                <img src='https://www.fonstola.ru/pic/201904/1920x1200/fonstola.ru_325057.jpg'/>
            </div>*/}
            <div className={css.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} className={css.avatar} alt=""/>
                {isOwner && <input type={"file"} onChange={onAvatarSelected}/>}

                {editMode
                    ? <ProfileDataForm profile={profile} onSubmit={onSubmit} />
                    : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={ () => {setEditMode(true)}} />
                }

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div><button onClick={goToEditMode}>Edit</button></div>}
        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
        </div>
        {profile.lookingForAJob &&
            <div>
                <b>My personal skills</b>: {profile.lookingForAJobDescription}
            </div>}
        <div>
            <b>About me</b>: {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts || {}).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>

    </div>
}

type ContactsPropsType = {
    contactTitle: string,
    contactValue: string
}

const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div className={css.contact}><b>{contactTitle}</b>: {contactValue}</div>;
}

export default ProfileInfo;
