const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: (fileContent) => ipcRenderer.invoke('load-file', fileContent),
  getPolynomial: (method) => ipcRenderer.invoke('get-polynomial', method),
  getEquations: () => ipcRenderer.invoke('get-equations'),
  getPlot: () => ipcRenderer.invoke('get-plot'),
  getPredictedPoints: () => ipcRenderer.invoke('get-predicted-points'), // Добавлен метод для получения предсказанных точек
  getMonteCarlo: () => ipcRenderer.invoke('get-monte-carlo'), // Добавлен метод для вызова метода Монте-Карло
  isWindowMaximized: () => ipcRenderer.invoke('is-window-maximized'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  unmaximizeWindow: () => ipcRenderer.invoke('unmaximize-window'),
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window')
});