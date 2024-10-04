"use strict";

var isMaximized = false;
document.getElementById('maximizeButton').addEventListener('click', function _callee() {
  var container, mpld3Baseaxes, isCurrentlyMaximized;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          container = document.querySelector('.container');
          mpld3Baseaxes = document.querySelector('.mpld3-baseaxes');
          _context.next = 4;
          return regeneratorRuntime.awrap(window.electronAPI.isWindowMaximized());

        case 4:
          isCurrentlyMaximized = _context.sent;

          if (isCurrentlyMaximized) {
            window.electronAPI.unmaximizeWindow();
            container.classList.remove('maximized');
            mpld3Baseaxes.classList.remove('maximized');
          } else {
            window.electronAPI.maximizeWindow();
            container.classList.add('maximized');
            mpld3Baseaxes.classList.add('maximized');
          }

          isMaximized = !isMaximized;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
});
document.getElementById('minimizeButton').addEventListener('click', function () {
  window.electronAPI.minimizeWindow();
});
document.getElementById('closeButton').addEventListener('click', function () {
  window.electronAPI.closeWindow();
});
document.getElementById('loadFileButton').addEventListener('click', function _callee3() {
  var fileInput, file, reader;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          fileInput = document.getElementById('fileInput');

          if (fileInput.files.length > 0) {
            file = fileInput.files[0];
            reader = new FileReader();

            reader.onload = function _callee2(event) {
              var fileContent, result, fileOutput;
              return regeneratorRuntime.async(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      fileContent = event.target.result;
                      console.log('File content loaded'); // Отладочное сообщение

                      _context2.prev = 2;
                      _context2.next = 5;
                      return regeneratorRuntime.awrap(window.electronAPI.loadFile(fileContent));

                    case 5:
                      result = _context2.sent;
                      fileOutput = document.getElementById('fileOutput');

                      if (!fileOutput) {
                        fileOutput = document.createElement('pre');
                        fileOutput.id = 'fileOutput';
                        document.getElementById('loadFileButton').insertAdjacentElement('afterend', fileOutput);
                      }

                      fileOutput.innerText = result;
                      _context2.next = 14;
                      break;

                    case 11:
                      _context2.prev = 11;
                      _context2.t0 = _context2["catch"](2);
                      console.error('Error loading file:', _context2.t0);

                    case 14:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, null, null, [[2, 11]]);
            };

            reader.readAsDataURL(file);
          } else {
            console.error('No file selected');
          }

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
});
document.getElementById('showPolynomialButton').addEventListener('click', function _callee4() {
  var result, polynomialOutput, scrollButtons, zoomSlider;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(window.electronAPI.getPolynomial());

        case 3:
          result = _context4.sent;
          polynomialOutput = document.getElementById('polynomialOutput');

          if (!polynomialOutput) {
            polynomialOutput = document.createElement('div');
            polynomialOutput.id = 'polynomialOutput';
            polynomialOutput.className = 'neon-border';
            document.getElementById('showPolynomialButton').insertAdjacentElement('afterend', polynomialOutput);
          }

          polynomialOutput.innerHTML = "<div class=\"output-box\">".concat(result, "</div>"); // Используем innerHTML для вставки HTML кода
          // Создаем и добавляем кнопки прокрутки

          scrollButtons = document.createElement('div');
          scrollButtons.className = 'scroll-buttons';
          scrollButtons.innerHTML = "\n      <button id=\"scrollLeftButton\" class=\"scroll-button\">\u2190</button>\n      <button id=\"scrollRightButton\" class=\"scroll-button\">\u2192</button>\n    ";
          polynomialOutput.appendChild(scrollButtons); // Создаем и добавляем слайдер для изменения масштаба

          zoomSlider = document.createElement('input');
          zoomSlider.type = 'range';
          zoomSlider.min = '0.5';
          zoomSlider.max = '2';
          zoomSlider.step = '0.1';
          zoomSlider.value = '1';
          zoomSlider.className = 'zoom-slider';
          polynomialOutput.appendChild(zoomSlider); // Добавляем обработчики событий для кнопок прокрутки

          document.getElementById('scrollLeftButton').addEventListener('click', function () {
            var outputBox = document.querySelector('.output-box');
            outputBox.scrollBy({
              left: -100,
              behavior: 'smooth'
            });
          });
          document.getElementById('scrollRightButton').addEventListener('click', function () {
            var outputBox = document.querySelector('.output-box');
            outputBox.scrollBy({
              left: 100,
              behavior: 'smooth'
            });
          }); // Добавляем обработчик событий для слайдера изменения масштаба

          zoomSlider.addEventListener('input', function (event) {
            var outputBoxContent = document.querySelector('.output-box').firstChild;
            outputBoxContent.style.transform = "scale(".concat(event.target.value, ")");
          }); // Отображаем элементы управления и неоновую рамку

          polynomialOutput.style.display = 'block';
          scrollButtons.style.display = 'flex';
          _context4.next = 29;
          break;

        case 26:
          _context4.prev = 26;
          _context4.t0 = _context4["catch"](0);
          console.error('Error getting polynomial:', _context4.t0);

        case 29:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 26]]);
});
document.getElementById('showEquationsButton').addEventListener('click', function _callee5() {
  var result, equationsOutput, scrollButtons, zoomSlider;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(window.electronAPI.getEquations());

        case 3:
          result = _context5.sent;
          equationsOutput = document.getElementById('equationsOutput');

          if (!equationsOutput) {
            equationsOutput = document.createElement('div');
            equationsOutput.id = 'equationsOutput';
            equationsOutput.className = 'neon-border';
            document.getElementById('showEquationsButton').insertAdjacentElement('afterend', equationsOutput);
          }

          equationsOutput.innerHTML = "<div class=\"output-box\">".concat(result, "</div>"); // Используем innerHTML для вставки HTML кода
          // Создаем и добавляем кнопки прокрутки

          scrollButtons = document.createElement('div');
          scrollButtons.className = 'scroll-buttons';
          scrollButtons.innerHTML = "\n      <button id=\"scrollLeftButtonEq\" class=\"scroll-button\">\u2190</button>\n      <button id=\"scrollRightButtonEq\" class=\"scroll-button\">\u2192</button>\n    ";
          equationsOutput.appendChild(scrollButtons); // Создаем и добавляем слайдер для изменения масштаба

          zoomSlider = document.createElement('input');
          zoomSlider.type = 'range';
          zoomSlider.min = '0.5';
          zoomSlider.max = '2';
          zoomSlider.step = '0.1';
          zoomSlider.value = '1';
          zoomSlider.className = 'zoom-slider';
          equationsOutput.appendChild(zoomSlider); // Добавляем обработчики событий для кнопок прокрутки

          document.getElementById('scrollLeftButtonEq').addEventListener('click', function () {
            var outputBox = document.querySelector('#equationsOutput .output-box');
            outputBox.scrollBy({
              left: -100,
              behavior: 'smooth'
            });
          });
          document.getElementById('scrollRightButtonEq').addEventListener('click', function () {
            var outputBox = document.querySelector('#equationsOutput .output-box');
            outputBox.scrollBy({
              left: 100,
              behavior: 'smooth'
            });
          }); // Добавляем обработчик событий для слайдера изменения масштаба

          zoomSlider.addEventListener('input', function (event) {
            var outputBoxContent = document.querySelector('#equationsOutput .output-box').firstChild;
            outputBoxContent.style.transform = "scale(".concat(event.target.value, ")");
          }); // Отображаем элементы управления и неоновую рамку

          equationsOutput.style.display = 'block';
          scrollButtons.style.display = 'flex';
          _context5.next = 29;
          break;

        case 26:
          _context5.prev = 26;
          _context5.t0 = _context5["catch"](0);
          console.error('Error getting equations:', _context5.t0);

        case 29:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 26]]);
});
document.getElementById('showPlotButton').addEventListener('click', function _callee6() {
  var result, plotOutputContainer, oldPlotOutput, plotOutput, figureData, loadScript, figureId;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return regeneratorRuntime.awrap(window.electronAPI.getPlot());

        case 3:
          result = _context6.sent;
          plotOutputContainer = document.getElementById('plotOutputContainer'); // Удаляем старый график, если он существует

          oldPlotOutput = document.getElementById('plotOutput');

          if (oldPlotOutput) {
            plotOutputContainer.removeChild(oldPlotOutput);
          } // Создаем новый элемент div для графика


          plotOutput = document.createElement('div');
          plotOutput.id = 'plotOutput';
          plotOutputContainer.appendChild(plotOutput); // Проверка, является ли результат JSON

          _context6.prev = 10;
          figureData = JSON.parse(result);
          _context6.next = 19;
          break;

        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](10);
          // Если результат не JSON, обрабатываем его как HTML
          plotOutput.innerHTML = result; // Используем setTimeout для задержки выполнения скриптов

          setTimeout(function () {
            var scripts = plotOutput.getElementsByTagName('script');
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = scripts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var script = _step.value;
                var newScript = document.createElement('script');

                if (script.src) {
                  newScript.src = script.src;
                } else {
                  newScript.textContent = script.textContent;
                }

                document.head.appendChild(newScript);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            console.log('Plot displayed as HTML'); // Отладочное сообщение
          }, 100); // Задержка в 100 миллисекунд

          return _context6.abrupt("return");

        case 19:
          // Динамическая загрузка mpld3
          loadScript = function loadScript(url) {
            return new Promise(function (resolve, reject) {
              var script = document.createElement('script');
              script.src = url;
              script.onload = resolve;

              script.onerror = function () {
                return reject(new Error("Failed to load script ".concat(url)));
              };

              document.head.appendChild(script);
            });
          }; // Загрузка необходимых библиотек с обработкой ошибок


          _context6.prev = 20;
          _context6.next = 23;
          return regeneratorRuntime.awrap(loadScript('https://d3js.org/d3.v5.js'));

        case 23:
          _context6.next = 25;
          return regeneratorRuntime.awrap(loadScript('https://mpld3.github.io/js/mpld3.v0.5.10.js'));

        case 25:
          console.log('Plot data loaded'); // Отладочное сообщение

          _context6.next = 32;
          break;

        case 28:
          _context6.prev = 28;
          _context6.t1 = _context6["catch"](20);
          console.error('Error loading scripts:', _context6.t1);
          return _context6.abrupt("return");

        case 32:
          // Убедимся, что mpld3 загружен и вызовем функцию отрисовки
          if (typeof mpld3 !== 'undefined' && mpld3._mpld3IsLoaded) {
            figureId = plotOutput.querySelector('div').id;
            mpld3.draw_figure(figureId, figureData);
          }

          console.log('Plot displayed as JSON'); // Отладочное сообщение

          _context6.next = 39;
          break;

        case 36:
          _context6.prev = 36;
          _context6.t2 = _context6["catch"](0);
          console.error('Error getting plot:', _context6.t2);

        case 39:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 36], [10, 14], [20, 28]]);
});