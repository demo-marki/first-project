import {actions} from "../../../redux/profile-reducer.ts";
import {connect} from "react-redux";
import MyPostMemorized, {DispatchPropsType, MapPropsType} from "./MyPosts.tsx";
import {AppStateType} from "../../../redux/redux-store";

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts
    } as MapPropsType
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
    mapStateToProps, {
    addPost: actions.addPostActionCreator}
)(MyPostMemorized);

export default MyPostsContainer;
