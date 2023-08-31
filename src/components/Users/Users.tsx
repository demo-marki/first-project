import React, {useEffect} from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UsersSearchForm} from "./UsersSearchForm.tsx";
import {FilterType, followThunkCreator, getUsersThunkCreator, unfollowThunkCreator} from "../../redux/users-reducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getTotalUsersCount, getUsers,
    getUsersFilter
} from "../../redux/users-selector.ts";
import {useNavigate, useSearchParams} from "react-router-dom";

const Users: React.FC = () => {

    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getUsers)
    const followingInProgress = useSelector((getFollowingInProgress))

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useEffect(() => {

    })

    useEffect(() => {
        const term = searchParams.get('term')
        const page = searchParams.get('page')
        const friend = searchParams.get('friend')

        let actualPage = currentPage
        let actualFilter = filter

        if (!!page) actualPage = Number(page)
        if (!!term) actualFilter = {...actualFilter, term: term}

        switch (friend){
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break
        }

        dispatch(getUsersThunkCreator(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(() => {
        navigate(`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
    }, [filter, currentPage])

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsersThunkCreator(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsersThunkCreator(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followThunkCreator(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowThunkCreator(userId))
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={followingInProgress}
                              follow={follow}
                              unfollow={unfollow} />)}
    </div>
}

export default Users;