import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {combineReducers, createStore} from "redux";
import {composeWithDevTools} from "@redux-devtools/extension";
import {todoReducer} from "./todoStore/reducer.js";
import {Provider} from "react-redux";

const rootReducer = combineReducers({
    todo: todoReducer
})

const rootStore = createStore(rootReducer, composeWithDevTools());

createRoot(document.getElementById('root')).render(
    <Provider store={rootStore}>
        <App/>
    </Provider>
)
