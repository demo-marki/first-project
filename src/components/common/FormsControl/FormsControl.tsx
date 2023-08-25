import styles from "./FormControl.module.css"
import {Field, FormikTouched} from "formik";
import {AddPostFormValues} from "../../Profile/MyPosts/AddPostForm/AddPostForm";

const FormControl = ({ error, touched, ...props }) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const TextArea = (props) => {
    const {error, touched, ...restProps} = props;
    return (
        <FormControl {...props}>
            <textarea {...props}></textarea>
        </FormControl>
    )
}

export const Input = (props) => {
    const {error, touched, ...restProps} = props;
    return (
        <FormControl {...props}>
            <input {...props}></input>
        </FormControl>
    )
}



export function CreateField<T extends string>(placeholder: string | null,
                            name: T,
                            error: any,
                            touched: FormikTouched<any>,
                            props={}, as: (props: any)=> JSX.Element = Input,
                            text=""){
    return <div>
        <Field as={as} name={name} placeholder={placeholder}
           error={error} touched={touched} {...props}/> {text}
    </div>
}

export type GetStringKeys<T> = Extract<keyof T, string>