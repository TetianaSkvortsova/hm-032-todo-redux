import { describe, it, expect } from 'vitest';
import { todoReducer, initialState } from '../reducer.js';
import { ADD_ITEM, COUNTER } from '../actions.js';

describe('todoReducer', () => {

    // Тест 1: Перевірка початкового стану
    it('should return the initial state', () => {
        expect(todoReducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(initialState);
    });

    // Тест 2: Обробка дії ADD_ITEM
    it('should handle ADD_ITEM by adding an item to the todo list', () => {
        const action = { type: ADD_ITEM, payload: 'Go shopping' };
        const newState = todoReducer(initialState, action);

        expect(newState.todo).toHaveLength(1);
        expect(newState.todo).toEqual(['Go shopping']);
        expect(newState.counter).toBe(0);
    });

    // Тест 3: Обробка дії COUNTER
    it('should handle COUNTER by incrementing the counter', () => {
        const stateWithItems = { todo: ['One item'], counter: 5 };
        const action = { type: COUNTER };
        const newState = todoReducer(stateWithItems, action);

        expect(newState.counter).toBe(6);
        expect(newState.todo).toEqual(['One item']);
    });
});