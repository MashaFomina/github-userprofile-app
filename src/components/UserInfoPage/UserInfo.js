import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

class UserInfo extends Component {
    render() {
        const avatarUrl = this.props.userInfo.avatar_url || '%PUBLIC_URL%/avatar.png';
        return (
            <Container>
                <Row>
                    <Col xs={12} md={3} className="User-profile-img-wrapper">
                        <Image className="User-profile-img" src={avatarUrl} rounded />
                    </Col>
                    <Col xs={12} md={8}>
                        <h5>{this.props.userInfo.name}</h5>
                        { this.props.userInfo.email &&
                            <p className="mb-2 text-muted">{this.props.userInfo.email}</p>
                        }
                        { this.props.userInfo.company &&
                            <p className="mb-2">{this.props.userInfo.company}</p>
                        }
                        { this.props.userInfo.bio &&
                            <p className="text">{this.props.userInfo.bio}</p>
                        }
                    </Col>
                    <Col xs={12} md={1}>
                        <a className="User-profile-link" href={this.props.userInfo.html_url}>
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </Col>
                </Row>
            </Container>
        )
    }
}

UserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired,
};

export default UserInfo;