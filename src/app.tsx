// This is the React entry point for the App
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import {Shell} from './components/shell'
import './index.scss';


const App = () => {
    return(
        <Provider store={store}>
            <Shell>
                <h1> This is inside shell</h1>
            </Shell>
        </Provider>
    )
}

ReactDom.render(<App />, document.getElementById('root'));
