const SEND_MESSAGE = 'SEND-MESSAGE';

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
    ]
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            let newMessage = {
                id: 6,
                message: action.text
            }
            return  {
                ...state,
                messages: [...state.messages, newMessage]
            };
        default:
            return state;
    }
}

export default dialogsReducer;

export const sendMessageActionCreator = (text) => ({
    type: SEND_MESSAGE,
    text: text
});