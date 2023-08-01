import React from "react";
import Users from "./Users";
import {
    setFollowingInProgress,
    getUsersThunkCreator, unfollowThunkCreator, followThunkCreator
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader"
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../redux/users-selector";

class UsersContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize)
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsersThunkCreator(pageNumber, pageSize)
    }

    render = () => {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow = {this.props.followThunkCreator}
                   unfollow = {this.props.unfollowThunkCreator}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps,
    {setFollowingInProgress,
        getUsersThunkCreator, unfollowThunkCreator, followThunkCreator})
    )(UsersContainer);