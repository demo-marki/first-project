import React from "react";
import Paginator from "../common/Paginator/Paginator.tsx";
import User from "./User.tsx";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    followingInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {
    return <div>
        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}/>
        {users.map(u => <User key={u.id}
                              user={u}
                              followingInProgress={props.followingInProgress}
                              follow={props.follow}
                              unfollow={props.unfollow} />)}
    </div>
}

export default Users;