import {actions, followThunkCreator, unfollowThunkCreator} from './users-reducer'
import {usersAPI} from "../api/users-api";
import {APIResponseType, ResultCodeEnum} from "../api/api";

jest.mock("../api/users-api")

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const result: APIResponseType = {
    resultCode: ResultCodeEnum.Success,
    messages: [],
    data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
})

test("success follow thunk", async() => {
    userAPIMock.follow.mockReturnValue(Promise.resolve(result))

    const thunk = followThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(1 ,true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(1 , false))
})

test("success unfollow thunk", async() => {
    userAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

    const thunk = unfollowThunkCreator(1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setFollowingInProgress(1 ,true))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setFollowingInProgress(1 , false))
})