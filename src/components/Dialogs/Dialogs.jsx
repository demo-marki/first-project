import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {TextArea} from "../common/FormsControl/FormsControl";

const SignupSchema = Yup.object().shape({
    newMessageBody: Yup.string()
        .max(150, 'Сообщение не должно превышать 150 символов')
        .required('Поле должно быть заполнено!'),
});

const AddMessageForm = (props) => {
    const submit = (values) => {
        props.onSubmitAction(values.newMessageBody);
    };

    return (
        <Formik
            initialValues={{newMessageBody: props.newMessage}}
            validationSchema={SignupSchema}
            onSubmit={submit}>
            {({errors, touched}) => (
                <Form>
                    <div>
                        <Field as={TextArea}
                               error={errors.newMessageBody}
                               touched={touched.newMessageBody}
                               name="newMessageBody"
                               placeholder='Введите свое сообщение'/>
                    </div>
                    <div>
                        <button type={"submit"}>Send</button>
                    </div>
                </Form>
            )}
        </Formik>)
}

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(
        d => (<DialogItem name={d.name} id={d.id}/>)
    );

    let messageElements = props.dialogsPage.messages.map(
        m => (<Message message={m.message}/>)
    )

    let onSendMessageClick = (text) => {
        props.sendMessage(text)
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                <div>{messageElements}</div>
                <AddMessageForm newMessage={props.dialogsPage.newMessageText}
                                onSubmitAction={onSendMessageClick}/>
            </div>
        </div>
    )
}

export default Dialogs;