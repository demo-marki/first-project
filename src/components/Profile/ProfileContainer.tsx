import React from "react";
import Profile from "./Profile.tsx";
import {
    getStatus,
    getUserProfile, saveAvatar,
    saveProfile,
    updateStatus
} from "../../redux/profile-reducer.ts";
import {connect} from "react-redux";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect.tsx";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void
    getStatus: (userId: number) => void
    updateStatus: (status: string) => void
    saveAvatar: (file: File) => void
    saveProfile: (profile: ProfileType, setStatus: () => void) => void
}
type PathParamsType = {
    userId: string,
    router: any
}
type PropsType = {

}

class ProfileContainer extends React.Component<MapPropsType & DispatchPropsType & PathParamsType> {

    refreshProfile () {
        let userId = this.props.router.params.userId;
        if (!userId){
            userId = this.props.userId;
            if (!userId){
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps:PropsType, prevState:AppStateType, snapshot) {
        if (this.props.router.params.userId !== prevProps.router.params.userId){
            this.refreshProfile();
        }
    }

    render = () => {
        return (<>
            <Profile {...this.props} profile={this.props.profile}
                     isOwner={!this.props.router.params.userId}
                     saveAvatar={this.props.saveAvatar}
                     saveProfile={this.props.saveProfile}
                     status={this.props.status} updateStatus={this.props.updateStatus} />
            </>)
    }
}

let mapStateToProps = (state: AppStateType) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth
});

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,
        {getUserProfile, getStatus, updateStatus, saveAvatar, saveProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)