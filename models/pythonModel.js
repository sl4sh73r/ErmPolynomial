const { spawn } = require('child_process');
const path = require('path');

function runPythonScript(command, args = []) {
  console.log('Running Python script with:', command, 'and args:', args); // Отладочное сообщение
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, '../python/calculations.py');
    console.log('Python script path:', scriptPath); // Отладочное сообщение
    const pythonProcess = spawn('python3', [scriptPath, command, ...args]);

    let output = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Ошибка: ${data.toString()}`); // Логирование ошибок
      output += `Ошибка: ${data.toString()}`;
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error(`Python script exited with code ${code}: ${output}`));
      }
    });

    pythonProcess.on('error', (err) => {
      console.error('Failed to start subprocess:', err); // Логирование ошибок запуска
      reject(new Error(`Failed to start subprocess: ${err.message}`));
    });
  });
}

module.exports = { runPythonScript };