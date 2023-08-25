import {Field, Form, Formik, FormikProps} from "formik";
import {CreateField, GetStringKeys, TextArea} from "../../common/FormsControl/FormsControl.tsx";
import s from './ProfileInfo.module.css'
import React from "react";
import * as Yup from "yup";
import style from "../../common/FormsControl/FormControl.module.css";
import {ProfileType} from "../../../types/types";

const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
        .max(100, 'Full name не должен превышать 100 символов')
        .required('Поле должно быть заполнено!'),
    lookingForAJobDescription: Yup.string()
        .max(1000, 'Текст не должен превышать 1000 символов')
        .required('Поле должно быть заполнено!'),
    aboutMe: Yup.string()
        .max(1000, 'Текст не должен превышать 1000 символов')
        .required('Поле должно быть заполнено!'),
});

type PropsType = {
    profile: ProfileType,
    onSubmit: (values: any, setStatus: () => void) => void
}
type ProfileTypeKeys = GetStringKeys<ProfileType>

const ProfileDataForm: React.FC<FormikProps<ProfileType> & PropsType> = ({profile, onSubmit}) => {
    const submit = (values, submitProps) => {
        onSubmit(values, submitProps.setStatus);
    };

    return <Formik initialValues={profile}
                   validationSchema={SignupSchema}
                   onSubmit={submit}>
        {(formik) => (
            <Form>
                <div>
                    <button type={"submit"}>Save</button>
                </div>
                {formik.status && formik.status.message && (
                    <div className={style.formSummaryError}>
                        {formik.status.message}
                    </div>
                )}
                <div>
                    <b>Full name</b>: {CreateField<ProfileTypeKeys>("Full name", "fullName", formik.errors.fullName, formik.touched.fullName, {})}
                </div>
                <div>
                    <b>Looking for a job</b>: {CreateField<ProfileTypeKeys>(null, "lookingForAJob", null, null, {type: "checkbox"})}
                </div>
                <div>
                    <b>My personal skills</b>: {<Field as={TextArea}
                                                       error={formik.errors.lookingForAJobDescription}
                                                       touched={formik.touched.lookingForAJobDescription}
                                                       name={"lookingForAJobDescription"}
                                                       placeholder={"Введите текст..."}/>}
                </div>
                <div>
                    <b>About me</b>: {<Field as={TextArea}
                                             error={formik.errors.aboutMe}
                                             touched={formik.touched.aboutMe}
                                             name={"aboutMe"}
                                             placeholder={"Введите текст..."}/>}
                </div>
                <div>
                    <b>Contacts</b>: {Object.keys(profile.contacts || {}).map(key => {
                    return <div key={key} className={s.contact}>
                        <b>{key}: {CreateField(key, "contacts." + key, null, null,/*formik.errors.fullName, formik.touched.fullName,*/ {})}</b>
                    </div>
                })}
                </div>
            </Form>
        )}
    </Formik>
}

export default ProfileDataForm;