import styles from "./FormControl.module.css"
import {Field} from "formik";

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

export const CreateField = (placeholder, name, error, touched, props={}, text="") => {
    return <div>
        <Field as={Input} name={name} placeholder={placeholder}
           error={error} touched={touched} {...props}/> {text}
    </div>
}