import pandas as pd
import numpy as np

def load_data_from_excel(file_path):
    """
    Загружает данные из Excel файла и вычисляет коэффициенты полинома Ньютона.
    
    :param file_path: Путь к Excel файлу
    :return: Кортеж с массивами x_values, y_values и coefficients
    """
    # Чтение данных из Excel файла
    df = pd.read_excel(file_path, header=None)
    x_values = df.iloc[0].dropna().values
    y_values = df.iloc[1].dropna().values
    
    # Вычисление коэффициентов полинома Ньютона
    coefficients = divided_diff(x_values, y_values)[0, :]
    return x_values, y_values, coefficients

def divided_diff(x, y):
    """
    Вычисляет таблицу разделенных разностей для полинома Ньютона.
    
    :param x: Массив значений x
    :param y: Массив значений y
    :return: Таблица разделенных разностей
    """
    n = len(y)
    coef = np.zeros([n, n])
    coef[:, 0] = y

    for j in range(1, n):
        for i in range(n - j):
            coef[i][j] = (coef[i + 1][j - 1] - coef[i][j - 1]) / (x[i + j] - x[i])
    return coef

def newton_poly(coef, x_data, x):
    """
    Вычисляет значение полинома Ньютона в точке x.
    
    :param coef: Коэффициенты полинома Ньютона
    :param x_data: Массив значений x
    :param x: Точка, в которой вычисляется значение полинома
    :return: Значение полинома в точке x
    """
    n = len(x_data) - 1
    p = coef[n]
    for k in range(1, n + 1):
        p = coef[n - k] + (x - x_data[n - k]) * p
    return p

def polynomial_to_string(coefficients, x_values):
    """
    Преобразует полином Ньютона в строковое представление.
    
    :param coefficients: Коэффициенты полинома Ньютона
    :param x_values: Массив значений x
    :return: Строковое представление полинома
    """
    terms = []
    for i, coeff in enumerate(coefficients):
        if i == 0:
            terms.append(f"{coeff:.2f}")
        else:
            term = f"{coeff:.2f}"
            for j in range(i):
                term += f"(x - {x_values[j]})"
            terms.append(term)
    polynomial = " + ".join(terms)
    polynomial = polynomial.replace("+ -", "- ")
    return f"P(x) = {polynomial}"

def create_system_of_equations(coefficients, x_values, y_values):
    """
    Создает систему уравнений на основе коэффициентов полинома Ньютона.
    
    :param coefficients: Коэффициенты полинома Ньютона
    :param x_values: Массив значений x
    :param y_values: Массив значений y
    :return: Строковое представление системы уравнений в формате LaTeX
    """
    equations = []
    n = len(coefficients)
    for i in range(n):
        terms = [f"{coefficients[j]:.2f} x_{j}" for j in range(n)]
        equation = " + ".join(terms) + f" = {y_values[i]}"
        equation = equation.replace("+ -", "- ")
        equations.append(equation)
    
    latex_equations = "\\begin{cases} "
    latex_equations += " \\\\ ".join(equations)
    latex_equations += " \\end{cases}"
    return latex_equations

def lagrange_polynomial_to_latex(x_data, y_data):
    """
    Преобразует полином Лагранжа в строковое представление LaTeX.
    
    :param x_data: Массив значений x
    :param y_data: Массив значений y
    :return: Строковое представление полинома в формате LaTeX
    """
    terms = []
    for i in range(len(x_data)):
        term = f"{y_data[i]:.2f}"
        for j in range(len(x_data)):
            if i != j:
                term += f" \\frac{{(x - {x_data[j]})}}{{({x_data[i]} - {x_data[j]})}}"
        terms.append(term)
    polynomial = " + ".join(terms)
    polynomial = polynomial.replace("+ -", "- ")
    return f"P(x) = {polynomial}"

def get_predicted_points(x_values, coefficients, num_extra_points=10):
    """
    Получает предсказанные точки на основе полинома Ньютона.
    
    :param x_values: Массив значений x
    :param coefficients: Коэффициенты полинома Ньютона
    :param num_extra_points: Количество дополнительных точек для предсказания
    :return: Два массива: предсказанные значения x и y
    """
    x_pred_within = np.linspace(min(x_values), max(x_values), len(x_values))
    y_pred_within = [newton_poly(coefficients, x_values, x) for x in x_pred_within]
    
    x_pred_extra = np.linspace(max(x_values) + 1, max(x_values) + num_extra_points, num_extra_points)
    y_pred_extra = [newton_poly(coefficients, x_values, x) for x in x_pred_extra]
    
    return x_pred_within, y_pred_within, x_pred_extra, y_pred_extra


def monte_carlo(x_values, y_values, num_samples=1000):

    """
    Выполняет метод Монте-Карло для оценки интеграла функции.

    
    :param x_values: Массив значений x
    :param y_values: Массив значений y
    :param num_samples: Количество случайных точек для выборки
    :return: Оценка интеграла функции
    """
    min_x, max_x = min(x_values), max(x_values)
    min_y, max_y = min(y_values), max(y_values)
    
    random_x = np.random.uniform(min_x, max_x, num_samples)
    random_y = np.random.uniform(min_y, max_y, num_samples)
    
    under_curve = np.sum(random_y < np.interp(random_x, x_values, y_values))
    area = (max_x - min_x) * (max_y - min_y)
    
    return (under_curve / num_samples) * area


def linear_regression(x, y):
    """
    Выполняет линейную регрессию.
    """
    A = np.vstack([x, np.ones(len(x))]).T
    m, c = np.linalg.lstsq(A, y, rcond=None)[0]
    return m, c

def moving_average(data, window_size):
    """
    Вычисляет скользящее среднее.
    """
    return np.convolve(data, np.ones(window_size)/window_size, mode='valid')

def least_squares_approximation(x, y):
    """
    Выполняет аппроксимацию методом наименьших квадратов.
    """
    A = np.vstack([x**i for i in range(len(x))]).T
    coeffs = np.linalg.lstsq(A, y, rcond=None)[0]
    return coeffs

def monte_carlo_plot(x, y, num_samples=1000):
    """
    Строит график методом Монте-Карло.
    """
    np.random.seed(42)
    simulations = np.random.normal(np.mean(y), np.std(y), (num_samples, len(x)))
    simulated_means = np.mean(simulations, axis=0)
    return simulated_means

def multivariable_function(x, y):
    """
    Пример функции многих переменных.
    """
    return x**2 + y**2