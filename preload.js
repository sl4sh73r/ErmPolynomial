const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (fileContent) => ipcRenderer.invoke('load-file', fileContent),
  getPolynomial: (method) => ipcRenderer.invoke('get-polynomial', method),
  getEquations: () => ipcRenderer.invoke('get-equations'),
  getPlot: (method) => ipcRenderer.invoke('get-plot', method),
  getPredictedPoints: () => ipcRenderer.invoke('get-predicted-points'),
  getMonteCarlo: () => ipcRenderer.invoke('get-monte-carlo'),
  isWindowMaximized: () => ipcRenderer.invoke('is-window-maximized'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.invoke('unmaximize-window'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  linearRegression: () => ipcRenderer.invoke('linear-regression'),
  linearSmoothing: () => ipcRenderer.invoke('linear-smoothing'),
  movingAverage: () => ipcRenderer.invoke('moving-average'),
  leastSquares: () => ipcRenderer.invoke('least-squares'),
  monteCarloPlot: () => ipcRenderer.invoke('monte-carlo-plot'),
  multivariableFunction: () => ipcRenderer.invoke('multivariable-function')
});