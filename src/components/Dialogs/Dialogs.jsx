import css from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Navigate} from "react-router-dom";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(
        d => (<DialogItem name={d.name} id={d.id}/>)
    );

    let messageElements = props.dialogsPage.messages.map(
        m => (<Message message={m.message}/>)
    )

    let onSendMessageClick = () => {
        props.sendMessage()
    }
    let onMewMessageChange = (e) => {
        let text = e.target.value;
        props.updateMewMessageText(text);
    }

    return (
        <div className={css.dialogs}>
            <div className={css.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={css.messages}>
                <div>{messageElements}</div>
                <div>
                    <div><textarea value={props.dialogsPage.newMessageText}
                                   onChange={onMewMessageChange}
                                   placeholder='Введите свое сообщение'/></div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialogs;