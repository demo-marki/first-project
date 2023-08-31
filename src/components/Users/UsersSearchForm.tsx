import {Field, Form, Formik} from "formik";
import React from "react";
import {FilterType} from "../../redux/users-reducer";
import {useSelector} from "react-redux";
import {getUsersFilter} from "../../redux/users-selector.ts";

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string,
    friend: FriendFormType
}

export const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
    const filter = useSelector(getUsersFilter)

    const submit = (values: FormType, {setSubmitting}: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === "null" ? null : values.friend === "true" ? true : false
        }
        setTimeout(() => {
            //alert(JSON.stringify(values, null, 2))
            props.onFilterChanged(filter)
            setSubmitting(false)
        }, 400)
    };
    const initialValues: FormType = {term: filter.term, friend: String(filter.friend) as FriendFormType}

    return <div>
        <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validate={usersSearchFormValidate}
            onSubmit={submit}>
            {({isSubmitting}) => (
                <Form>
                    <Field name="term" type="text"/>
                    <Field name="friend" as="select" >
                        <option value="null">All</option>
                        <option value="true">Only followed</option>
                        <option value="false">Only unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Найти
                    </button>

                </Form>
            )}
        </Formik>
    </div>
})
