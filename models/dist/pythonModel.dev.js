"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var _require = require('child_process'),
    spawn = _require.spawn;

var path = require('path');

function runPythonScript(command) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  console.log('Running Python script with:', command, 'and args:', args); // Отладочное сообщение

  return new Promise(function (resolve, reject) {
    var scriptPath = path.join(__dirname, '../python/calculations.py');
    var pythonPath = path.join(__dirname, '../.venv/Scripts/python.exe'); // Укажите путь к интерпретатору Python

    var pythonProcess = spawn(pythonPath, [scriptPath, command].concat(_toConsumableArray(args)));
    var output = '';
    pythonProcess.stdout.on('data', function (data) {
      output += data.toString();
    });
    pythonProcess.stderr.on('data', function (data) {
      console.error("\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(data.toString())); // Логирование ошибок

      output += "\u041E\u0448\u0438\u0431\u043A\u0430: ".concat(data.toString());
    });
    pythonProcess.on('close', function (code) {
      if (code === 0) {
        resolve(output);
      } else {
        reject(new Error("Python script exited with code ".concat(code, ": ").concat(output)));
      }
    });
    pythonProcess.on('error', function (err) {
      console.error('Failed to start subprocess:', err); // Логирование ошибок запуска

      reject(new Error("Failed to start subprocess: ".concat(err.message)));
    });
  });
}

module.exports = {
  runPythonScript: runPythonScript
};