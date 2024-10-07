const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (fileContent) => ipcRenderer.invoke('load-file', fileContent),
  getPolynomial: (method) => ipcRenderer.invoke('get-polynomial', method),
  getEquations: () => ipcRenderer.invoke('get-equations'),
  getPlot: () => ipcRenderer.invoke('get-plot'),
  isWindowMaximized: () => ipcRenderer.invoke('is-window-maximized'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.invoke('unmaximize-window'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window')
});