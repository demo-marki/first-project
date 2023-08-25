import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import {Form, Formik, FormikProps} from "formik";
import * as Yup from "yup";
import {CreateField, GetStringKeys, TextArea} from "../common/FormsControl/FormsControl.tsx";
import {InitialStateType} from "../../redux/dialogs-reducer";

const SignupSchema = Yup.object().shape({
    newMessageBody: Yup.string()
        .max(150, 'Сообщение не должно превышать 150 символов')
        .required('Поле должно быть заполнено!'),
});

interface NewMessageFormValues {
    newMessageBody: string
}
type NewMessageFormValuesKeys = GetStringKeys<NewMessageFormValues>

type PropsType = {
    onSubmitAction: (values) => void
}

const AddMessageForm: React.FC<FormikProps<NewMessageFormValuesKeys> & PropsType> = (props) => {
    const submit = (values) => {
        props.onSubmitAction(values.newMessageBody);
    };
    const initialValues: NewMessageFormValuesKeys = {newMessageBody: ''}

    return (
        <Formik
            initialValues= {initialValues}
            validationSchema={SignupSchema}
            onSubmit={submit}>
            {({errors, touched}) => (
                <Form>
                    <div>
                        {CreateField<NewMessageFormValuesKeys>("Введите свое сообщение", "newMessageBody",
                            errors.newMessageBody, touched.newMessageBody, {}, TextArea)}
                    </div>
                    <div>
                        <button type={"submit"}>Send</button>
                    </div>
                </Form>
            )}
        </Formik>)
}

type OwnPropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void
}

const Dialogs: React.FC<OwnPropsType> = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(
        d => (<DialogItem name={d.name} id={d.id}/>)
    );

    let messageElements = props.dialogsPage.messages.map(
        m => (<Message message={m.message}/>)
    )

    let onSendMessageClick = (text: string) => {
        props.sendMessage(text)
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                <div>{messageElements}</div>
                <AddMessageForm onSubmitAction={onSendMessageClick}/>
            </div>
        </div>
    )
}

export default Dialogs;