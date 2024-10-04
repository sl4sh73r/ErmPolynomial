const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (fileContent) => ipcRenderer.invoke('load-file', fileContent),
  getPolynomial: () => ipcRenderer.invoke('get-polynomial'),
  getEquations: () => ipcRenderer.invoke('get-equations'),
  getPlot: () => ipcRenderer.invoke('get-plot'),
  isWindowMaximized: () => ipcRenderer.invoke('isWindowMaximized'),
  maximizeWindow: () => ipcRenderer.invoke('maximizeWindow'),
  unmaximizeWindow: () => ipcRenderer.invoke('unmaximizeWindow'),
  minimizeWindow: () => ipcRenderer.invoke('minimizeWindow'),
  closeWindow: () => ipcRenderer.invoke('closeWindow')
});