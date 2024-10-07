const { ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const { runPythonScript } = require('../models/pythonModel');
const katex = require('katex');

let filePath = '';

ipcMain.handle('load-file', async (event, fileContent) => {
  if (!fileContent) {
    console.error('No file content provided to controller'); // Отладочное сообщение
    throw new Error('No file content provided');
  }

  filePath = path.join(__dirname, '../uploads/temp.xlsx');
  fs.writeFileSync(filePath, fileContent.split(',')[1], 'base64');
  console.log('File saved at:', filePath); // Отладочное сообщение

  try {
    await runPythonScript('load', [filePath]);
    return 'Файл загружен и данные обработаны';
  } catch (error) {
    console.error('Error in load-file handler:', error);
    throw error;
  }
});

ipcMain.handle('get-polynomial', async (event, method) => {
  try {
    console.log(`Received method: ${method}`); // Отладочное сообщение
    const command = method === 'lagrange' ? 'lagrange' : 'polynomial';
    console.log(`Running Python script with: ${command} and args: [ '${filePath}' ]`); // Отладочное сообщение
    const result = await runPythonScript(command, [filePath]);
    console.log(`Python script result: ${result}`); // Отладочное сообщение
    
    const html = katex.renderToString(result, {
      throwOnError: false,
      displayMode: true
    });
    return html;
  } catch (error) {
    console.error('Error in get-polynomial handler:', error);
    throw error;
  }
});

ipcMain.handle('get-equations', async () => {
  try {
    const result = await runPythonScript('equations', [filePath]);
    
    const html = katex.renderToString(result, {
      throwOnError: false,
      displayMode: true
    });
    return html;
  } catch (error) {
    console.error('Error in get-equations handler:', error);
    throw error;
  }
});

ipcMain.handle('get-plot', async () => {
  try {
    const result = await runPythonScript('plot', [filePath]);
    return result; // Возвращаем HTML-код графика
  } catch (error) {
    console.error('Error in get-plot handler:', error);
    throw error;
  }
});