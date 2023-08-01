import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

test('new post should be added', () => {
    //1.test data
    let action = addPostActionCreator("it-kamasutra");
    let state = {
        posts: [
            {id: 1, message: 'Hi!', likesCount: 0},
            {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
            {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
            {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5}
        ]
    };
    //2.action
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {
    //1.test data
    let action = addPostActionCreator("it-kamasutra");
    let state = {
        posts: [
            {id: 1, message: 'Hi!', likesCount: 0},
            {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
            {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
            {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5}
        ]
    };
    //2.action
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts[4].message).toBe("it-kamasutra");
});

test('after deleting length of message should be decrement', () => {
    //1.test data
    let action = deletePost(1);
    let state = {
        posts: [
            {id: 1, message: 'Hi!', likesCount: 0},
            {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
            {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
            {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5}
        ]
    };
    //2.action
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(3);
});

test(`after deleting length shouldn't be decrement if id incorrect`, () => {
    //1.test data
    let action = deletePost(1000);
    let state = {
        posts: [
            {id: 1, message: 'Hi!', likesCount: 0},
            {id: 2, message: 'Стена ВКонтакте: что это за зверь и как с ним работать?', likesCount: 12},
            {id: 3, message: 'Как писать на своей стене?', likesCount: 23},
            {id: 4, message: 'Как писать на стене друга или другого пользователя?', likesCount: 5}
        ]
    };
    //2.action
    let newState = profileReducer(state,action)
    //3.expectation
    expect(newState.posts.length).toBe(4);
});