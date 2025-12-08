import { describe, it, expect, vi, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen } from './test-utils';
import App from '../../App.jsx';
import { initialState } from '../reducer.js';
import {cleanup} from "@testing-library/react";

window.alert = vi.fn();

afterEach(() => {
    cleanup();
});

describe('App Component', () => {
    // Тест 1: Що сторінка має заголовок Todo-list
    it('should render the main title "Todo-list"', () => {
        render(<App />);
        const titleElement = screen.getByText('Todo-list');
        expect(titleElement).toBeInTheDocument();
    });

    // Тест 2: Що у поле для тексту можна ввести як цифри, так і букви
    it('should accept mixed alphanumeric input and successfully add it to the list', async () => {
        const user = userEvent.setup();

        render(<App />);

        const input = screen.getByRole('textbox', { name: /todo/i });
        const addButton = screen.getByRole('button', { name: /add/i });
        const mixedInput = 'Task 123 for today';

        await user.type(input, mixedInput);

        expect(input).toHaveValue(mixedInput);

        await user.click(addButton);

        expect(screen.getByText(mixedInput)).toBeInTheDocument();

        expect(input).toHaveValue('');
    });

    // Тест 3: Можна протестувати, що після натискання на кнопку “Додати” без тексту, ви отримаєте помилку
    it('should show an alert and not add an item if the input is empty', async () => {
        const user = userEvent.setup();
        render(<App />);

        const initialCounterText = initialState.counter.toString();
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.click(addButton);

        expect(window.alert).toHaveBeenCalledWith('The task cannot be empty');

        expect(screen.getByText('The list is empty yet')).toBeInTheDocument();

        expect(screen.getByText(initialCounterText)).toBeInTheDocument();
    });

    // Тест 4: Успішне додавання елемента
    it('should add a new todo item and update the counter upon submission', async () => {
        const user = userEvent.setup();
        render(<App />);

        const input = screen.getByRole('textbox', { name: /todo item input/i });
        const addButton = screen.getByRole('button', { name: /add/i });

        await user.type(input, 'Send emails');

        await user.click(addButton);

        expect(screen.getByText('Send emails')).toBeInTheDocument();

        expect(screen.getByText('1')).toBeInTheDocument();

        expect(input).toHaveValue('');
    });

    // Test 5: Перевірка початкового рендерингу
    it('should render with initial state and empty list message', () => {
        render(<App />);

        expect(screen.getByText('The list is empty yet')).toBeInTheDocument();

        expect(screen.getByText(initialState.counter.toString())).toBeInTheDocument();
    });
});