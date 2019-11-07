import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export const history = createBrowserHistory()

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    ...reducers
});

export default function configureStore(preloadedState) {
    const store = createStore(
        createRootReducer(history), // root reducer with router state
        // preloadedState,
        composeWithDevTools( // compose(
            applyMiddleware(
                routerMiddleware(history), // for dispatching history actions
                thunk,
                createLogger(),
            ),
        ),
    )
    return store
};
