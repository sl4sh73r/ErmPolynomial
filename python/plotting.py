import numpy as np
import matplotlib.pyplot as plt
import mpld3
from data_processing import newton_poly, get_predicted_points

# Устанавливаем режим без графического интерфейса
plt.switch_backend('Agg')

def plot_graph(x_values, y_values, coefficients):
    """
    Строит график полинома Ньютона и предсказанных точек.
    
    :param x_values: Массив значений x
    :param y_values: Массив значений y
    :param coefficients: Коэффициенты полинома Ньютона
    :return: HTML представление графика
    """
    if x_values.size == 0 or y_values.size == 0:
        raise ValueError("x_values or y_values is empty")
    
    # Создание новых значений x для построения гладкого графика полинома
    x_poly = np.linspace(min(x_values), max(x_values), 100)
    y_poly = [newton_poly(coefficients, x_values, x) for x in x_poly]
    
    # Получение предсказанных точек
    x_pred_within, y_pred_within, x_pred_extra, y_pred_extra = get_predicted_points(x_values, coefficients)
    
    # Построение графика
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(x_values, y_values, 'bo', label='Data points')
    ax.plot(x_poly, y_poly, 'r-', label='Newton Polynomial')
    ax.scatter(x_pred_within, y_pred_within, c='g', label='Predicted points within range')
    ax.scatter(x_pred_extra, y_pred_extra, c='m', label='Predicted points extra range')  # Используем scatter для предсказанных точек за пределами интервала
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Newton Polynomial Interpolation')
    ax.grid(True)
    
    # Установка начальных пределов осей
    ax.set_xlim(min(x_values) - 1, max(x_pred_extra) + 1)
    ax.set_ylim(min(y_values) - 10, max(y_pred_extra) + 10)
    
    # Преобразование графика в HTML
    html = mpld3.fig_to_html(fig)
    plt.close(fig)
    return html

def predicted_points_table(x_pred, y_pred):
    """
    Создает таблицу предсказанных точек.
    
    :param x_pred: Массив предсказанных значений x
    :param y_pred: Массив предсказанных значений y
    :return: Строковое представление таблицы предсказанных точек
    """
    table = "<table><tr><th>x</th><th>y</th></tr>"
    for x, y in zip(x_pred, y_pred):
        table += f"<tr><td>{x:.2f}</td><td>{y:.2f}</td></tr>"
    table += "</table>"
    return table