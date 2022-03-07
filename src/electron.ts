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
            contextIsolation: false
        }
    });

    win.loadFile('index.html');

}

app.on('ready', createWindow);
