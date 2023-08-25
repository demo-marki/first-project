import {Form, Formik, FormikProps} from "formik";
import {CreateField, GetStringKeys, TextArea} from "../../../common/FormsControl/FormsControl.tsx";
import * as Yup from 'yup';
import React from "react";

const SignupSchema = Yup.object().shape({
    newPostText: Yup.string()
        .max(50, 'Пост не должен превышать 50 символов')
        .required('Поле должно быть заполнено!'),
});

type PropsType = {
    onSubmit: (newPostText: string) => void
}

export interface AddPostFormValues {
    newPostText: string
}
type AddPostFormValuesKeys = GetStringKeys<AddPostFormValues>

const AddNewPostForm: React.FC<FormikProps<AddPostFormValues> & PropsType> = (props) => {
    const submit = (values) => {
        props.onSubmit(values.newPostText);
    }
    const initialValues: AddPostFormValuesKeys = {newPostText: ''}

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={submit}>
            {({errors, touched}) => (
                <Form>
                    {CreateField<AddPostFormValuesKeys>("Введите текст...", "newPostText",
                        errors.newPostText, touched.newPostText, {}, TextArea)}

                    <div>
                        <button type={"submit"}>Add post</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default AddNewPostForm