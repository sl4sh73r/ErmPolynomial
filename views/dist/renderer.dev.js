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

            if (mpld3Baseaxes) {
              mpld3Baseaxes.classList.remove('maximized');
            }
          } else {
            window.electronAPI.maximizeWindow();
            container.classList.add('maximized');

            if (mpld3Baseaxes) {
              mpld3Baseaxes.classList.add('maximized');
            }
          }

          isMaximized = !isMaximized; // Перерисовка графика с небольшой задержкой

          setTimeout(function () {
            if (typeof mpld3 !== 'undefined' && mpld3._mpld3IsLoaded) {
              var figureId = mpld3Baseaxes ? mpld3Baseaxes.id : null;

              if (figureId) {
                mpld3.draw_figure(figureId, mpld3.figures[figureId].data);
              }
            }
          }, 300); // Задержка в 300 миллисекунд

        case 8:
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
  var polynomialOutput, result, scrollButtons, zoomSlider, isCurrentlyMaximized;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          polynomialOutput = document.getElementById('polynomialOutput');

          if (!(polynomialOutput && polynomialOutput.style.display === 'block')) {
            _context4.next = 6;
            break;
          }

          polynomialOutput.style.display = 'none';
          document.getElementById('showPolynomialButton').innerHTML = '<i class="fas fa-eye"></i> Показать полином';
          return _context4.abrupt("return");

        case 6:
          _context4.next = 8;
          return regeneratorRuntime.awrap(window.electronAPI.getPolynomial());

        case 8:
          result = _context4.sent;

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
          scrollButtons.innerHTML = "\n      <button id=\"scrollLeftButton\" class=\"scroll-button\"><i class=\"fas fa-arrow-left\"></i></button>\n      <button id=\"scrollRightButton\" class=\"scroll-button\"><i class=\"fas fa-arrow-right\"></i></button>\n    ";
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
          }); // Проверка состояния окна при отображении полинома

          _context4.next = 28;
          return regeneratorRuntime.awrap(window.electronAPI.isWindowMaximized());

        case 28:
          isCurrentlyMaximized = _context4.sent;

          if (isCurrentlyMaximized) {
            polynomialOutput.classList.add('maximized');
            console;
          } else {
            polynomialOutput.classList.remove('maximized');
          } // Отображаем элементы управления и неоновую рамку


          polynomialOutput.style.display = 'block';
          scrollButtons.style.display = 'flex';
          document.getElementById('showPolynomialButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть полином';
          _context4.next = 38;
          break;

        case 35:
          _context4.prev = 35;
          _context4.t0 = _context4["catch"](0);
          console.error('Error getting polynomial:', _context4.t0);

        case 38:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 35]]);
});
document.getElementById('showEquationsButton').addEventListener('click', function _callee5() {
  var equationsOutput, result, scrollButtons, zoomSlider;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          equationsOutput = document.getElementById('equationsOutput');

          if (!(equationsOutput && equationsOutput.style.display === 'block')) {
            _context5.next = 6;
            break;
          }

          equationsOutput.style.display = 'none';
          document.getElementById('showEquationsButton').innerHTML = '<i class="fas fa-eye"></i> Показать систему уравнений';
          return _context5.abrupt("return");

        case 6:
          _context5.next = 8;
          return regeneratorRuntime.awrap(window.electronAPI.getEquations());

        case 8:
          result = _context5.sent;

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
          scrollButtons.innerHTML = "\n      <button id=\"scrollLeftButtonEq\" class=\"scroll-button\"><i class=\"fas fa-arrow-left\"></i></button>\n      <button id=\"scrollRightButtonEq\" class=\"scroll-button\"><i class=\"fas fa-arrow-right\"></i></button>\n    ";
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
          document.getElementById('showEquationsButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть систему уравнений';
          _context5.next = 34;
          break;

        case 31:
          _context5.prev = 31;
          _context5.t0 = _context5["catch"](0);
          console.error('Error getting equations:', _context5.t0);

        case 34:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 31]]);
});
document.getElementById('showPlotButton').addEventListener('click', function _callee6() {
  var plotOutputContainer, result, oldPlotOutput, plotOutput, isCurrentlyMaximized;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          plotOutputContainer = document.getElementById('plotOutputContainer');
          console.log('showPlotButton clicked'); // Отладочное сообщение

          if (!(plotOutputContainer.style.display === 'block')) {
            _context6.next = 7;
            break;
          }

          plotOutputContainer.style.display = 'none';
          document.getElementById('showPlotButton').innerHTML = '<i class="fas fa-eye"></i> Показать график';
          return _context6.abrupt("return");

        case 7:
          _context6.next = 9;
          return regeneratorRuntime.awrap(window.electronAPI.getPlot());

        case 9:
          result = _context6.sent;
          console.log('Plot data received'); // Отладочное сообщение
          // Удаляем старый график, если он существует

          oldPlotOutput = document.getElementById('plotOutput');

          if (oldPlotOutput) {
            plotOutputContainer.removeChild(oldPlotOutput);
            console.log('Old plot removed'); // Отладочное сообщение
          } // Создаем новый элемент div для графика


          plotOutput = document.createElement('div');
          plotOutput.id = 'plotOutput';
          plotOutputContainer.appendChild(plotOutput);
          console.log('New plot element created'); // Отладочное сообщение
          // Проверка состояния окна при отображении графика

          _context6.next = 19;
          return regeneratorRuntime.awrap(window.electronAPI.isWindowMaximized());

        case 19:
          isCurrentlyMaximized = _context6.sent;

          if (isCurrentlyMaximized) {
            plotOutput.classList.add('maximized');
            console.log('Plot maximized'); // Отладочное сообщение
          } else {
            plotOutput.classList.remove('maximized');
            console.log('Plot not maximized'); // Отладочное сообщение
          } // Обрабатываем данные как HTML


          plotOutput.innerHTML = result;
          console.log('Plot data is HTML'); // Отладочное сообщение
          // Используем setTimeout для задержки выполнения скриптов

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

          plotOutputContainer.style.display = 'block';
          document.getElementById('showPlotButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть график';
          _context6.next = 31;
          break;

        case 28:
          _context6.prev = 28;
          _context6.t0 = _context6["catch"](0);
          console.error('Error getting plot:', _context6.t0);

        case 31:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 28]]);
});