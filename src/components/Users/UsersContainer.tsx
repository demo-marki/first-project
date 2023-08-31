import React from "react";
import Users from "./Users.tsx";
import {useSelector} from "react-redux";
import Preloader from "../common/Preloader/Preloader.tsx"
import {getIsFetching} from "../../redux/users-selector.ts";


type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = () => {
    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader /> : null}
        <Users />
    </>
}