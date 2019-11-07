import githubActions from './github';

const deleteErrorMessage = (dispatch) => {
    setTimeout(() => {
        dispatch({type: 'DELETE_ERROR_MESSAGE'})
    }, 10000); // 10 seconds
};

export {
    githubActions,
    deleteErrorMessage
};