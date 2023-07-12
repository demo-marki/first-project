import React from "react";
import Users from "./Users";
import {
    follow,
    setCurrentPage,
    setFollowingInProgress,
    unfollow, getUsersThunkCreator, unfollowThunkCreator, followThunkCreator
} from "../../redux/users-reducer";
import {connect} from "react-redux";
import Preloader from "../../components/common/Preloader/Preloader"
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.getUsersThunkCreator(pageNumber, this.props.pageSize)
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
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
    {setCurrentPage, setFollowingInProgress,
        getUsersThunkCreator, unfollowThunkCreator, followThunkCreator})
    )(UsersContainer);