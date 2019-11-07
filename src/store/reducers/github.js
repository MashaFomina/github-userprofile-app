import GithubActions from '../types/github';

const initialState = {
    userInfo: null,
    userFriends: null,
    fetchCount: 0,
    errorMessage: null,
};

const githubReducer = (state = initialState, action) => {
    switch (action.type) {
        case GithubActions.GET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
                fetchCount: state.fetchCount - 1
            };
        case GithubActions.GET_USER_FRIENDS:
            return {
                ...state,
                userFriends: action.payload,
                fetchCount: state.fetchCount - 1
            };
        case GithubActions.GET_USER_INFO_FAILED:
        case GithubActions.GET_USER_FRIENDS_FAILED:
            return {
                ...state,
                errorMessage: action.payload,
                fetchCount: state.fetchCount - 1
            };
        case GithubActions.GET_USER_INFO_REQUEST:
        case GithubActions.GET_USER_FRIENDS_REQUEST:
            return {
                ...state,
                fetchCount: state.fetchCount + 1
            };
        case GithubActions.DELETE_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: null
            }
        }
        default:
            return {
                ...state
            }
    }
};

export default githubReducer;
