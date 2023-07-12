import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi!', likesCount: 0},
                {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
                {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
                {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5},
                {id: 5, message: 'Что такое стена в ВК?', likesCount: 7}
            ],
            newPostText: 'Труляля'
        },
        dialogsPage: {
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
        },
        sidebar: {}
    },
    _callSubscriber() {
        console.log('State changed');
    },
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },

    dispatch(action) { // { type: 'ADD-POST' }
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber();
    }

}

export default store;
window.store = store;