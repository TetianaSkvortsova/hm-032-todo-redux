import {ADD_ITEM, COUNTER} from './actions.js';

export const initialState = {
    todo: [],
    counter: 0,
};

export const todoReducer = (state = initialState, action) => {
    let newStore;
    switch (action.type) {
        case ADD_ITEM:
            newStore = {
                ...state,
                todo: [...state.todo, action.payload],
            }
            return newStore;

        case COUNTER:
            newStore = {
                ...state,
                counter: state.counter + 1
            }
            return newStore;
    }
    return state;
}