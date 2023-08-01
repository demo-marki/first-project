//import css from './Login.module.css'

import formik, {Field, Form, Formik} from "formik";
import {CreateField, Input} from "../common/FormsControl/FormsControl";
import * as Yup from "yup";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style from "../common/FormsControl/FormControl.module.css"

const loginFormValidate = (any) => {
    const errors ={}
    return errors
}

const loginFormObjectType = {
    /*login: string
    password: string*/
}

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .max(30, 'Логин не должен превышать 10 символов')
        .required('Поле должно быть заполнено!'),
    password: Yup.string()
        .max(20, 'Пароль не должен превышать 10 символов')
        .required('Поле должно быть заполнено!'),
});

const LoginForm = (props) => {
    const submit = (values, submitProps) => {
        console.log("Form is validated! Submitting the form...");
        console.log(values);
        props.onSubmitAction(values, submitProps.setStatus);
        submitProps.resetForm()
    };

    return (
        <Formik
            initialValues={{email: "", password: "", rememberMe: true}}
            validationSchema={SignupSchema}
            onSubmit={submit}
        >
            {(formik) => (
                <Form>
                    {CreateField("Email", "email", formik.errors.email, formik.touched.email, {type: "email"})}
                    {CreateField("Password", "password", formik.errors.password, formik.touched.password, {type: "password"})}
                    {CreateField(null, "rememberMe", null, null, {type: "checkbox"}, "remember me" )}

                    {formik.status && formik.status.message && (
                        <div className={style.formSummaryError}>
                            {formik.status.message}
                        </div>
                    )}
                    <div>
                        <button type={"submit"}>Login</button>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

const Login = (props) => {
    const onSubmit = (formData, setStatus) => {
        props.login(formData.email, formData.password, formData.rememberMe, setStatus);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmitAction={onSubmit}/>
        </div>
    )
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login})(Login);