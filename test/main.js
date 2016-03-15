'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');

app.on('window-all-closed', () => app.quit());
app.on('ready', () => {
    var win = new BrowserWindow({
        width: 800,
        height: 600
    });
    const html = 'file://' + path.join(__dirname, 'index.html');
    win.loadURL(html);
    win.on('closed', () => { win = null; });
});
