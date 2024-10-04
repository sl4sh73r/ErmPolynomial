"use strict";

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow,
    ipcMain = _require.ipcMain;

var path = require('path');

require('./controllers/pythonController');

var mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    transparent: true,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false
    }
  });
  mainWindow.loadFile('views/index.html'); // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.handle('isWindowMaximized', function () {
  return mainWindow.isMaximized();
});
ipcMain.handle('maximizeWindow', function () {
  mainWindow.maximize();
});
ipcMain.handle('unmaximizeWindow', function () {
  mainWindow.unmaximize();
});
ipcMain.handle('minimizeWindow', function () {
  mainWindow.minimize();
});
ipcMain.handle('closeWindow', function () {
  mainWindow.close();
});