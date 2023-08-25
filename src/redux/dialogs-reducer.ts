import {InferActionsTypes} from "./redux-store";

type DialogType ={
    id: number
    name: string
}

type MessageType ={
    id: number
    message: string
}

let initialState = {
    dialogs: [
        {id: 1, name: 'Irina'},
        {id: 2, name: 'Mary'},
        {id: 3, name: 'Leon'},
        {id: 5, name: 'Gleb'},
        {id: 6, name: 'Sveta'}
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: 'Hi!'},
        {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?'},
        {id: 3, message: 'Как писать на своей стене?'},
        {id: 4, message: 'Как писать на стене друга или другого пользователя?'},
        {id: 5, message: 'Что такое стена в ВК?'}
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>

const dialogsReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SN/DIALOG/SEND-MESSAGE':
            let newMessage = {
                id: 6,
                message: action.text
            }
            return  {
                ...state,
                messages: [...state.messages, newMessage]
            } as InitialStateType;
        default:
            return state;
    }
}

export const actions = {
    sendMessageActionCreator: (text: string) => ({type: 'SN/DIALOG/SEND-MESSAGE', text: text} as const),
}

export default dialogsReducer;