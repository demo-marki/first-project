const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {id: 1, name: 'Irina'},
        {id: 2, name: 'Mary'},
        {id: 3, name: 'Leon'},
        {id: 5, name: 'Gleb'},
        {id: 6, name: 'Sveta'}
    ],
    messages: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?'},
        {id: 3, message: 'Как писать на своей стене?'},
        {id: 4, message: 'Как писать на стене друга или другого пользователя?'},
        {id: 5, message: 'Что такое стена в ВК?'}
    ],
    newMessageText: ''
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            };
        case SEND_MESSAGE:
            let newMessage = {
                id: 6,
                message: state.newMessageText
            }
            return  {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''
            };
        default:
            return state;
    }
}

export default dialogsReducer;

export const sendMessageActionCreator = () => ({type: SEND_MESSAGE});

export const updateNewMessageTextActionCreator = (text) => ({
    type: UPDATE_NEW_MESSAGE_TEXT,
    newText: text
});