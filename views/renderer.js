let isMaximized = false;

document.getElementById('maximizeButton').addEventListener('click', async () => {
  const container = document.querySelector('.container');
  const mpld3Baseaxes = document.querySelector('.mpld3-baseaxes');
  
  const isCurrentlyMaximized = await window.electronAPI.isWindowMaximized();

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

  isMaximized = !isMaximized;

  // Перерисовка графика с небольшой задержкой
  setTimeout(() => {
    if (typeof mpld3 !== 'undefined' && mpld3._mpld3IsLoaded) {
      const figureId = mpld3Baseaxes ? mpld3Baseaxes.id : null;
      if (figureId) {
        mpld3.draw_figure(figureId, mpld3.figures[figureId].data);
      }
    }
  }, 300); // Задержка в 300 миллисекунд
});

document.getElementById('minimizeButton').addEventListener('click', () => {
  window.electronAPI.minimizeWindow();
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
    let polynomialOutput = document.getElementById('polynomialOutput');
    if (polynomialOutput && polynomialOutput.style.display === 'block') {
      polynomialOutput.style.display = 'none';
      document.getElementById('showPolynomialButton').innerHTML = '<i class="fas fa-eye"></i> Показать полином';
      return;
    }

    const result = await window.electronAPI.getPolynomial();
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
      <button id="scrollLeftButton" class="scroll-button"><i class="fas fa-arrow-left"></i></button>
      <button id="scrollRightButton" class="scroll-button"><i class="fas fa-arrow-right"></i></button>
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

    // Проверка состояния окна при отображении полинома
    const isCurrentlyMaximized = await window.electronAPI.isWindowMaximized();
    if (isCurrentlyMaximized) {
      polynomialOutput.classList.add('maximized');
      console
    } else {
      polynomialOutput.classList.remove('maximized');
    }

    // Отображаем элементы управления и неоновую рамку
    polynomialOutput.style.display = 'block';
    scrollButtons.style.display = 'flex';
    document.getElementById('showPolynomialButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть полином';
  } catch (error) {
    console.error('Error getting polynomial:', error);
  }
});

document.getElementById('showEquationsButton').addEventListener('click', async () => {
  try {
    let equationsOutput = document.getElementById('equationsOutput');
    if (equationsOutput && equationsOutput.style.display === 'block') {
      equationsOutput.style.display = 'none';
      document.getElementById('showEquationsButton').innerHTML = '<i class="fas fa-eye"></i> Показать систему уравнений';
      return;
    }

    const result = await window.electronAPI.getEquations();
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
      <button id="scrollLeftButtonEq" class="scroll-button"><i class="fas fa-arrow-left"></i></button>
      <button id="scrollRightButtonEq" class="scroll-button"><i class="fas fa-arrow-right"></i></button>
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
    document.getElementById('showEquationsButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть систему уравнений';
  } catch (error) {
    console.error('Error getting equations:', error);
  }
});

document.getElementById('showPlotButton').addEventListener('click', async () => {
  try {
    const plotOutputContainer = document.getElementById('plotOutputContainer');
    console.log('showPlotButton clicked'); // Отладочное сообщение

    if (plotOutputContainer.style.display === 'block') {
      plotOutputContainer.style.display = 'none';
      document.getElementById('showPlotButton').innerHTML = '<i class="fas fa-eye"></i> Показать график';
      return;
    }

    const result = await window.electronAPI.getPlot();
    console.log('Plot data received'); // Отладочное сообщение

    // Удаляем старый график, если он существует
    const oldPlotOutput = document.getElementById('plotOutput');
    if (oldPlotOutput) {
      plotOutputContainer.removeChild(oldPlotOutput);
      console.log('Old plot removed'); // Отладочное сообщение
    }

    // Создаем новый элемент div для графика
    const plotOutput = document.createElement('div');
    plotOutput.id = 'plotOutput';
    plotOutputContainer.appendChild(plotOutput);
    console.log('New plot element created'); // Отладочное сообщение

    // Проверка состояния окна при отображении графика
    const isCurrentlyMaximized = await window.electronAPI.isWindowMaximized();
    if (isCurrentlyMaximized) {
      plotOutput.classList.add('maximized');
      console.log('Plot maximized'); // Отладочное сообщение
    } else {
      plotOutput.classList.remove('maximized');
      console.log('Plot not maximized'); // Отладочное сообщение
    }

    // Обрабатываем данные как HTML
    plotOutput.innerHTML = result;
    console.log('Plot data is HTML'); // Отладочное сообщение

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

    plotOutputContainer.style.display = 'block';
    document.getElementById('showPlotButton').innerHTML = '<i class="fas fa-eye-slash"></i> Скрыть график';
  } catch (error) {
    console.error('Error getting plot:', error);
  }
});