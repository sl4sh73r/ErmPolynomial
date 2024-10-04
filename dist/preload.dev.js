"use strict";

var _require = require('electron'),
    contextBridge = _require.contextBridge,
    ipcRenderer = _require.ipcRenderer;

contextBridge.exposeInMainWorld('electronAPI', {
  loadFile: function loadFile(fileContent) {
    return ipcRenderer.invoke('load-file', fileContent);
  },
  getPolynomial: function getPolynomial() {
    return ipcRenderer.invoke('get-polynomial');
  },
  getEquations: function getEquations() {
    return ipcRenderer.invoke('get-equations');
  },
  getPlot: function getPlot() {
    return ipcRenderer.invoke('get-plot');
  },
  isWindowMaximized: function isWindowMaximized() {
    return ipcRenderer.invoke('isWindowMaximized');
  },
  maximizeWindow: function maximizeWindow() {
    return ipcRenderer.invoke('maximizeWindow');
  },
  unmaximizeWindow: function unmaximizeWindow() {
    return ipcRenderer.invoke('unmaximizeWindow');
  },
  minimizeWindow: function minimizeWindow() {
    return ipcRenderer.invoke('minimizeWindow');
  },
  closeWindow: function closeWindow() {
    return ipcRenderer.invoke('closeWindow');
  }
});