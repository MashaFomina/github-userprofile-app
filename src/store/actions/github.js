import GithubActions from 'store/types/github';
import * as GithubService from 'services/github';
import { deleteErrorMessage } from 'store/actions/index';

const getUserInfo = (login) => async dispatch => {
    dispatch({type: GithubActions.GET_USER_INFO_REQUEST});
    try {
        const userInfo = await GithubService.getUserInfo(login);
        dispatch({
            type: GithubActions.GET_USER_INFO,
            payload: userInfo,
        });
    } catch (err) {
        dispatch({
            type: GithubActions.GET_USER_INFO_FAILED,
            payload: `Не удалось получить информацию о пользователе ${login}. ${(typeof err === 'object' ? err.message : err)}`
        });
        deleteErrorMessage(dispatch);
    }
};

const getUserFriends = (login) => async dispatch => {
    dispatch({type: GithubActions.GET_USER_FRIENDS_REQUEST});
    try {
        const userFriends = await GithubService.getUserFriends(login);
        dispatch({
            type: GithubActions.GET_USER_FRIENDS,
            payload: userFriends,
        });
    } catch (err) {
        dispatch({
            type: GithubActions.GET_USER_FRIENDS_FAILED,
            payload: `Не удалось получить информацию о друзьях пользователя ${login}. ${(typeof err === 'object' ? err.message : err)}`
        });
        deleteErrorMessage(dispatch);
    }
};

export default {
    getUserInfo,
    getUserFriends
};
