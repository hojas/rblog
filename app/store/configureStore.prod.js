import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import * as reducers from '../reducers';


const reducer = combineReducers({
    ...reducers,
    form: formReducer,
});

const enhancer = compose(
    applyMiddleware(thunk),
);

export default function configureStore(initialState) {
    return createStore(reducer, initialState, enhancer);
};

