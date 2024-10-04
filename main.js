const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
require('./controllers/pythonController');

let mainWindow;

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

  mainWindow.loadFile('views/index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('isWindowMaximized', () => {
  return mainWindow.isMaximized();
});

ipcMain.handle('maximizeWindow', () => {
  mainWindow.maximize();
});

ipcMain.handle('unmaximizeWindow', () => {
  mainWindow.unmaximize();
});

ipcMain.handle('minimizeWindow', () => {
  mainWindow.minimize();
});

ipcMain.handle('closeWindow', () => {
  mainWindow.close();
});