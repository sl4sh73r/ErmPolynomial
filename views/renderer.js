document.getElementById('minimizeButton').addEventListener('click', () => {
  window.electronAPI.minimizeWindow();
});

document.getElementById('maximizeButton').addEventListener('click', () => {
  window.electronAPI.maximizeWindow();
});

document.getElementById('closeButton').addEventListener('click', () => {
  window.electronAPI.closeWindow();
});

document.getElementById('loadFileButton').addEventListener('click', async () => {
  const fileInput = document.getElementById('fileInput');
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const fileContent = event.target.result;
      console.log('File content loaded'); // Отладочное сообщение
      try {
        const result = await window.electronAPI.loadFile(fileContent);
        let fileOutput = document.getElementById('fileOutput');
        if (!fileOutput) {
          fileOutput = document.createElement('pre');
          fileOutput.id = 'fileOutput';
          document.getElementById('loadFileButton').insertAdjacentElement('afterend', fileOutput);
        }
        fileOutput.innerText = result;
      } catch (error) {
        console.error('Error loading file:', error);
      }
    };

    reader.readAsDataURL(file);
  } else {
    console.error('No file selected');
  }
});

document.getElementById('showPolynomialButton').addEventListener('click', async () => {
  try {
    const result = await window.electronAPI.getPolynomial();
    let polynomialOutput = document.getElementById('polynomialOutput');
    if (!polynomialOutput) {
      polynomialOutput = document.createElement('div');
      polynomialOutput.id = 'polynomialOutput';
      polynomialOutput.className = 'neon-border';
      document.getElementById('showPolynomialButton').insertAdjacentElement('afterend', polynomialOutput);
    }
    polynomialOutput.innerHTML = `<div class="output-box">${result}</div>`; // Используем innerHTML для вставки HTML кода

    // Создаем и добавляем кнопки прокрутки
    const scrollButtons = document.createElement('div');
    scrollButtons.className = 'scroll-buttons';
    scrollButtons.innerHTML = `
      <button id="scrollLeftButton" class="scroll-button">←</button>
      <button id="scrollRightButton" class="scroll-button">→</button>
    `;
    polynomialOutput.appendChild(scrollButtons);

    // Создаем и добавляем слайдер для изменения масштаба
    const zoomSlider = document.createElement('input');
    zoomSlider.type = 'range';
    zoomSlider.min = '0.5';
    zoomSlider.max = '2';
    zoomSlider.step = '0.1';
    zoomSlider.value = '1';
    zoomSlider.className = 'zoom-slider';
    polynomialOutput.appendChild(zoomSlider);

    // Добавляем обработчики событий для кнопок прокрутки
    document.getElementById('scrollLeftButton').addEventListener('click', () => {
      const outputBox = document.querySelector('.output-box');
      outputBox.scrollBy({ left: -100, behavior: 'smooth' });
    });

    document.getElementById('scrollRightButton').addEventListener('click', () => {
      const outputBox = document.querySelector('.output-box');
      outputBox.scrollBy({ left: 100, behavior: 'smooth' });
    });

    // Добавляем обработчик событий для слайдера изменения масштаба
    zoomSlider.addEventListener('input', (event) => {
      const outputBoxContent = document.querySelector('.output-box').firstChild;
      outputBoxContent.style.transform = `scale(${event.target.value})`;
    });

    // Отображаем элементы управления и неоновую рамку
    polynomialOutput.style.display = 'block';
    scrollButtons.style.display = 'flex';
  } catch (error) {
    console.error('Error getting polynomial:', error);
  }
});

document.getElementById('showEquationsButton').addEventListener('click', async () => {
  try {
    const result = await window.electronAPI.getEquations();
    let equationsOutput = document.getElementById('equationsOutput');
    if (!equationsOutput) {
      equationsOutput = document.createElement('div');
      equationsOutput.id = 'equationsOutput';
      equationsOutput.className = 'neon-border';
      document.getElementById('showEquationsButton').insertAdjacentElement('afterend', equationsOutput);
    }
    equationsOutput.innerHTML = `<div class="output-box">${result}</div>`; // Используем innerHTML для вставки HTML кода

    // Создаем и добавляем кнопки прокрутки
    const scrollButtons = document.createElement('div');
    scrollButtons.className = 'scroll-buttons';
    scrollButtons.innerHTML = `
      <button id="scrollLeftButtonEq" class="scroll-button">←</button>
      <button id="scrollRightButtonEq" class="scroll-button">→</button>
    `;
    equationsOutput.appendChild(scrollButtons);

    // Создаем и добавляем слайдер для изменения масштаба
    const zoomSlider = document.createElement('input');
    zoomSlider.type = 'range';
    zoomSlider.min = '0.5';
    zoomSlider.max = '2';
    zoomSlider.step = '0.1';
    zoomSlider.value = '1';
    zoomSlider.className = 'zoom-slider';
    equationsOutput.appendChild(zoomSlider);

    // Добавляем обработчики событий для кнопок прокрутки
    document.getElementById('scrollLeftButtonEq').addEventListener('click', () => {
      const outputBox = document.querySelector('#equationsOutput .output-box');
      outputBox.scrollBy({ left: -100, behavior: 'smooth' });
    });

    document.getElementById('scrollRightButtonEq').addEventListener('click', () => {
      const outputBox = document.querySelector('#equationsOutput .output-box');
      outputBox.scrollBy({ left: 100, behavior: 'smooth' });
    });

    // Добавляем обработчик событий для слайдера изменения масштаба
    zoomSlider.addEventListener('input', (event) => {
      const outputBoxContent = document.querySelector('#equationsOutput .output-box').firstChild;
      outputBoxContent.style.transform = `scale(${event.target.value})`;
    });

    // Отображаем элементы управления и неоновую рамку
    equationsOutput.style.display = 'block';
    scrollButtons.style.display = 'flex';
  } catch (error) {
    console.error('Error getting equations:', error);
  }
});
document.getElementById('showPlotButton').addEventListener('click', async () => {
  try {
    const result = await window.electronAPI.getPlot();
    const plotOutputContainer = document.getElementById('plotOutputContainer');

    // Удаляем старый график, если он существует
    const oldPlotOutput = document.getElementById('plotOutput');
    if (oldPlotOutput) {
      plotOutputContainer.removeChild(oldPlotOutput);
    }

    // Создаем новый элемент div для графика
    const plotOutput = document.createElement('div');
    plotOutput.id = 'plotOutput';
    plotOutputContainer.appendChild(plotOutput);

    // Проверка, является ли результат JSON
    let figureData;
    try {
      figureData = JSON.parse(result);
    } catch (e) {
      // Если результат не JSON, обрабатываем его как HTML
      plotOutput.innerHTML = result;

      // Используем setTimeout для задержки выполнения скриптов
      setTimeout(() => {
        const scripts = plotOutput.getElementsByTagName('script');
        for (let script of scripts) {
          const newScript = document.createElement('script');
          if (script.src) {
            newScript.src = script.src;
          } else {
            newScript.textContent = script.textContent;
          }
          document.head.appendChild(newScript);
        }
        console.log('Plot displayed as HTML'); // Отладочное сообщение
      }, 100); // Задержка в 100 миллисекунд

      return;
    }

    // Динамическая загрузка mpld3
    const loadScript = (url) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Failed to load script ${url}`));
        document.head.appendChild(script);
      });
    };

    // Загрузка необходимых библиотек с обработкой ошибок
    try {
      await loadScript('https://d3js.org/d3.v5.js');
      await loadScript('https://mpld3.github.io/js/mpld3.v0.5.10.js');
      console.log('Plot data loaded'); // Отладочное сообщение
    } catch (error) {
      console.error('Error loading scripts:', error);
      return;
    }

    // Убедимся, что mpld3 загружен и вызовем функцию отрисовки
    if (typeof mpld3 !== 'undefined' && mpld3._mpld3IsLoaded) {
      const figureId = plotOutput.querySelector('div').id;
      mpld3.draw_figure(figureId, figureData);
    }

    console.log('Plot displayed as JSON'); // Отладочное сообщение
  } catch (error) {
    console.error('Error getting plot:', error);
  }
});