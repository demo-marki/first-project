import css from './Login.module.css'
import {Form, Formik, FormikProps} from "formik";
import {CreateField, GetStringKeys, Input} from "../common/FormsControl/FormsControl.tsx";
import * as Yup from "yup";
import {connect, useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer.ts";
import {Navigate} from "react-router-dom";
import style from "../common/FormsControl/FormControl.module.css"
import {AppStateType, TypedDispatch, useTypedDispatch} from "../../redux/redux-store";
import {AnyAction} from "redux";

const SignupSchema = Yup.object().shape({
    email: Yup.string()
        .max(30, 'Логин не должен превышать 30 символов')
        .required('Поле должно быть заполнено!'),
    password: Yup.string()
        .max(20, 'Пароль не должен превышать 20 символов')
        .required('Поле должно быть заполнено!'),
    /*captcha: Yup.string()
        .max(20, 'Текст не должен превышать 20 символов')
        .required('Поле должно быть заполнено!'),*/
});

type LoginFormOwnProps = {
    captchaUrl: string
    onSubmitAction: (values, setStatus) => void
}

const LoginForm: React.FC<FormikProps<LoginFormValues> & LoginFormOwnProps> = (props) => {
    const submit = (values, submitProps) => {
        console.log("Form is validated! Submitting the form...");
        console.log(values);
        props.onSubmitAction(values, submitProps.setStatus);
        submitProps.resetForm()
    };
    const initialValues: LoginFormValuesTypeKeys = {email: '', password: '', rememberMe: true, captcha: null}

    return (
        <Formik
            initialValues= {initialValues}
            validationSchema={SignupSchema}
            onSubmit={submit}
        >
            {(formik) => (
                <Form>
                    {CreateField<LoginFormValuesTypeKeys>("Email", "email", formik.errors.email, formik.touched.email, {type: "email"})}
                    {CreateField<LoginFormValuesTypeKeys>("Password", "password", formik.errors.password, formik.touched.password, {type: "password"})}
                    {CreateField<LoginFormValuesTypeKeys>(null, "rememberMe", null, null, {type: "checkbox"}, Input,"remember me" )}

                    {props.captchaUrl && <img className={css.captcha} src={props.captchaUrl} />}
                    {props.captchaUrl && CreateField("Symbols from image", "captcha", null, null)}

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

interface LoginFormValues {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValues>

export const LoginPage: React.FC = () => {

    const captchaUrl = useSelector( (state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch()

    const onSubmit = (formData: any, setStatus: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha, setStatus) as AnyAction);
    }

    if (isAuth) {
        return <Navigate to={"/profile"} />
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginForm onSubmitAction={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}
