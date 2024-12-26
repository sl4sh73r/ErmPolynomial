import numpy as np
import matplotlib.pyplot as plt
import mpld3
from data_processing import newton_poly, get_predicted_points
import warnings
from scipy import stats

warnings.filterwarnings("ignore", category=UserWarning, module='mpld3')
# Устанавливаем режим без графического интерфейса
plt.switch_backend('Agg')

def plot_graph(x_values, y_values, coefficients, method):
    """
    Строит график в зависимости от выбранного метода.
    
    :param x_values: Массив значений x
    :param y_values: Массив значений y
    :param coefficients: Коэффициенты полинома Ньютона
    :param method: Метод построения графика
    :return: HTML представление графика
    """
    if x_values.size == 0 or y_values.size == 0:
        raise ValueError("x_values or y_values is empty")
    
    fig, ax = plt.subplots(figsize=(10, 6))
    
    if method == 'newton':
        plot_newton_polynomial(ax, x_values, y_values, coefficients)
    elif method == 'linear_regression':
        plot_linear_regression(ax, x_values, y_values)
    elif method == 'linear_smoothing':
        plot_linear_smoothing(ax, x_values, y_values)
    elif method == 'moving_average':
        plot_moving_average(ax, x_values, y_values)
    elif method == 'least_squares':
        plot_least_squares(ax, x_values, y_values)
    elif method == 'monte_carlo':
        plot_monte_carlo(ax, x_values, y_values)
    elif method == 'multivariable_function':
        plot_multivariable_function(ax, x_values, y_values)
    else:
        raise ValueError(f"Unknown method: {method}")
    
    # Преобразование графика в HTML
    html = mpld3.fig_to_html(fig)
    plt.close(fig)
    return html

def plot_newton_polynomial(ax, x_values, y_values, coefficients):
    x_poly = np.linspace(min(x_values), max(x_values), 100)
    y_poly = [newton_poly(coefficients, x_values, x) for x in x_poly]
    x_pred_within, y_pred_within, x_pred_extra, y_pred_extra = get_predicted_points(x_values, coefficients)
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_poly, y_poly, 'r-', label='Newton Polynomial')
    ax.scatter(x_pred_within, y_pred_within, c='g', label='Predicted points within range')
    ax.scatter(x_pred_extra, y_pred_extra, c='m', label='Predicted points extra range')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Newton Polynomial Interpolation')
    ax.grid(True)
    ax.set_xlim(min(x_values) - 1, max(x_pred_extra) + 1)
    ax.set_ylim(min(y_values) - 10, max(y_pred_extra) + 10)

def plot_linear_regression(ax, x_values, y_values):
    slope, intercept, r_value, p_value, std_err = stats.linregress(x_values, y_values)
    linear_fit = slope * x_values + intercept
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values, linear_fit, 'r-', label=f'Linear Regression: y = {slope:.2f}x + {intercept:.2f}')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Linear Regression')
    ax.grid(True)

def plot_linear_smoothing(ax, x_values, y_values):
    # Пример линейного сглаживания
    slope, intercept, r_value, p_value, std_err = stats.linregress(x_values, y_values)
    linear_fit = slope * x_values + intercept
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values, linear_fit, 'r-', label=f'Linear Smoothing: y = {slope:.2f}x + {intercept:.2f}')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Linear Smoothing')
    ax.grid(True)

def plot_moving_average(ax, x_values, y_values, window_size=3):
    moving_average = np.convolve(y_values, np.ones(window_size)/window_size, mode='valid')
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values[window_size-1:], moving_average, 'r-', label=f'Moving Average (window={window_size})')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Moving Average')
    ax.grid(True)

def plot_least_squares(ax, x_values, y_values):
    coeffs = np.polyfit(x_values, y_values, 2)
    poly_fit = np.polyval(coeffs, x_values)
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values, poly_fit, 'r-', label='Least Squares (2nd degree polynomial)')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Least Squares Approximation')
    ax.grid(True)

def plot_monte_carlo(ax, x_values, y_values, num_samples=1000):
    np.random.seed(42)
    simulations = np.random.normal(np.mean(y_values), np.std(y_values), (num_samples, len(x_values)))
    simulated_means = np.mean(simulations, axis=0)
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values, simulated_means, 'r-', label='Monte Carlo Simulation')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Monte Carlo Simulation')
    ax.grid(True)

def plot_multivariable_function(ax, x_values, y_values):
    coeffs = np.polyfit(x_values, y_values, 2)
    poly_fit = np.polyval(coeffs, x_values)
    
    ax.plot(x_values, y_values, 'bo-', label='Data points')
    ax.plot(x_values, poly_fit, 'r-', label='Multivariable Function (2nd degree polynomial)')
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Multivariable Function')
    ax.grid(True)

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