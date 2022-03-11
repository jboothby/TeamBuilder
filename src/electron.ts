import path from "path";
import installExtension, { REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS } from 'electron-devtools-installer';

// This is the Electron Main process
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV === 'development';

let win;

function createWindow () {

    win = new BrowserWindow({
        width: 1200,
        height: 900,
        webPreferences: {
            devTools: isDev,
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });

    win.loadFile('../dist/index.html');

}

app.on('ready', createWindow);

app.whenReady().then(() => {
    installExtension(REDUX_DEVTOOLS)
        .then(name => console.log(`Added ${name}`))
        .catch(err => console.log('Error: ', err));
})
