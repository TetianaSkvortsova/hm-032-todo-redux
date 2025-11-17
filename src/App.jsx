import './App.css'
import {useDispatch, useSelector} from "react-redux";
import {ADD_ITEM, COUNTER} from './todoStore/actions.js';
import {useRef} from "react";

function App() {
    const todoList = useSelector(state => state.todo);
    const dispatch = useDispatch();

    const todoRef = useRef('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const todoItem = todoRef.current.value.trim();
        console.log('todo: ', todoItem);
        if(todoItem) {
            dispatch({type: ADD_ITEM, payload: todoItem});
            dispatch({type: COUNTER});
            todoRef.current.value = '';
        } else {
            alert('The task cannot be empty');
        }
    }

    return (
        <div className="container">
            <p>Todo-list</p>
            <div className="add-form">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="todo" ref={todoRef} />
                    <button type="submit">Add</button>
                </form>
            </div>
            <div className="list-container">
                {!todoList.todo.length && <span>The list is empty yet</span>}
                <ul>
                    {todoList.todo.map((todoItem, index) =>
                        <li key={index}>{todoItem}</li>)}
                </ul>
            </div>
            <div className="counter">
                <span>All together: </span>
                <span>{todoList.counter}</span>
            </div>
        </div>
    )
}

export default App
