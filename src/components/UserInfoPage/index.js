import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { githubActions } from 'store/actions';
import UserInfo from './UserInfo';
import FriendsInfo from './FriendsInfo';
import './UserCard.css';

class UserInfoPage extends Component {
    componentDidMount() {
        this.props.githubActions.getUserInfo(this.props.githubLogin);
        this.props.githubActions.getUserFriends(this.props.githubLogin);
    }

    render() {
        return (
            <div className="User-card">
                {this.props.userInfo ?
                    (<Fragment>
                        <UserInfo userInfo={this.props.userInfo}/>
                        { this.props.userFriends && Array.isArray(this.props.userFriends) &&
                            <Fragment>
                                <hr className="User-card-delimeter" />
                                <FriendsInfo userFriends={this.props.userFriends} />
                            </Fragment>
                        }
                    </Fragment>)
                    : (<Alert variant={"primary"}>
                        Извините, информация временно недоступна.
                    </Alert>)
                }

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    userInfo: state.github.userInfo,
    userFriends: state.github.userFriends,
});

const mapDispatchToProps = (dispatch) => ({
    githubActions: bindActionCreators(githubActions, dispatch),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoPage));
