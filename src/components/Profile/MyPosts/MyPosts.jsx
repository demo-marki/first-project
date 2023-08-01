import css from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, Form, Formik} from "formik";
import {TextArea} from "../../common/FormsControl/FormsControl";
import * as Yup from 'yup';
import React from "react";

const SignupSchema = Yup.object().shape({
    newPostText: Yup.string()
        .max(50, 'Пост не должен превышать 50 символов')
        .required('Поле должно быть заполнено!'),
});

const AddNewPostForm = (props) => {
    const submit = (values) => {
        props.onSubmit(values.newPostText);
    }

    return (
        <Formik
            initialValues={{newPostText: ""}}
            validationSchema={SignupSchema}
            onSubmit={submit}>
            {({errors, touched}) => (
                <Form>
                    <Field as={TextArea}
                           error={errors.newPostText}
                           touched={touched.newPostText}
                           name={"newPostText"}
                           placeholder={"Введите текст..."}/>

                    <div>
                        <button type={"submit"}>Add post</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const MyPosts = React.memo((props) => {

    let postsElements = props.posts.map(
        p => (<Post message={p.message} likescount={p.likesCount}/>)
    )

    let onAddPost = (text) => {
        props.addPost(text);
    }

    return (
        <div className={css.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostForm onSubmit={onAddPost} />
            <div className={css.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;
