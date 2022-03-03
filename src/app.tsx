// This is the React entry point for the App
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Shell } from './components/shell/shell'
import { ShellGrid } from './components/shell-grid/shell-grid'
import './index.scss';


const App = () => {
    return(
        <Provider store={store}>
            <Shell/>
            <ShellGrid/>
        </Provider>
    )
}

ReactDom.render(<App />, document.getElementById('root'));
