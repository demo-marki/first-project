import {actions} from "../../redux/dialogs-reducer.ts";
import Dialogs from "./Dialogs.tsx";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {sendMessage: actions.sendMessageActionCreator}),
    withAuthRedirect
)(Dialogs);