const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (fileContent) => ipcRenderer.invoke('load-file', fileContent),
  getPolynomial: () => ipcRenderer.invoke('get-polynomial'),
  getEquations: () => ipcRenderer.invoke('get-equations'),
  getPlot: () => ipcRenderer.invoke('get-plot'),
  minimizeWindow: () => ipcRenderer.send('minimize-window'),
  maximizeWindow: () => ipcRenderer.send('maximize-window'),
  closeWindow: () => ipcRenderer.send('close-window')
});