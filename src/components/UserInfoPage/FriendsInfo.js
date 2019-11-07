import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

class FriendsInfo extends Component {
    render() {
        return (
            <Container className="User-card-friends">
                <Row className="User-card-friends-header">
                    <h4>Друзья ({this.props.userFriends.length})</h4>
                </Row>
                {this.props.userFriends.map((friend, i) => (
                    <Row key={"friend" + i} className="User-card-friends-row">
                        <Col xs={2} md={1}>
                            <Image className="User-friend-img"
                                src={friend.avatar_url || 'avatar.png'} rounded />
                        </Col>
                        <Col xs={8} md={10}>
                            <h5>{friend.login}</h5>
                        </Col>
                        <Col xs={2} md={1}>
                            <a className="User-profile-link" href={friend.html_url}>
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                        </Col>
                    </Row>
                ))}
            </Container>
        )
    }
}

FriendsInfo.propTypes = {
    userFriends: PropTypes.array.isRequired,
};

export default FriendsInfo;
