import {Navigate} from "react-router-dom";
import React from "react";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {

}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props

        if (!isAuth) return <Navigate to={"/login"}/>;
        return <WrappedComponent {...restProps} />
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForRedirect)(RedirectComponent)
}