// This is the Electron Main process
const { app, BrowserWindow } = require('electron');

const isDev = process.env.NODE_ENV === 'development';

let win;

function createWindow () {

    win = new BrowserWindow({
        width: 1600,
        height: 1200,
        webPreferences: {
            devTools: isDev,
            nodeIntegration: true
        }
    });

    win.loadFile('index.html');

    // if (isDev) {
    //     win.webContents.once("dom-ready", async () => {
    //         await installExtension([REDUX_DEVTOOLS, REACT_DEVELOPER_TOOLS])
    //             .then(name => console.log(`Added Extension: $(name)`))
    //             .catch(err => console.log(`Error: ${err}`))
    //             .finally(() => {
    //                 win.webContents.openDevTools();
    //             })
    //     })
    // }
}

app.on('ready', createWindow);
