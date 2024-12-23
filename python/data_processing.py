import pandas as pd
import numpy as np

# Глобальные переменные для хранения значений x, y и коэффициентов полинома
x_values = []
y_values = []
coefficients = []

def load_data_from_excel(file_path):
    """
    Загружает данные из Excel файла и вычисляет коэффициенты полинома Ньютона.
    
    :param file_path: Путь к Excel файлу
    :return: Сообщение о загрузке данных
    """
    global x_values, y_values, coefficients
    if not file_path:
        raise ValueError("No file path provided")
    
    # Чтение данных из Excel файла
    df = pd.read_excel(file_path, header=None)
    x_values = df.iloc[0].dropna().values
    y_values = df.iloc[1].dropna().values
    
    # Вычисление коэффициентов полинома Ньютона
    coefficients = divided_diff(x_values, y_values)[0, :]
    return "Данные загружены"

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

def lagrange_poly(x_data, y_data, x):
    """
    Вычисляет значение полинома Лагранжа в точке x.
    
    :param x_data: Массив значений x
    :param y_data: Массив значений y
    :param x: Точка, в которой вычисляется значение полинома
    :return: Значение полинома в точке x
    """
    def L(k, x):
        term = y_data[k]
        for i in range(len(x_data)):
            if i != k:
                term *= (x - x_data[i]) / (x_data[k] - x_data[i])
        return term

    return sum(L(k, x) for k in range(len(x_data)))

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
    Возвращает предсказанные точки на основе полинома Ньютона.
    
    :param x_values: Массив значений x
    :param coefficients: Коэффициенты полинома Ньютона
    :param num_extra_points: Количество дополнительных точек для предсказания
    :return: Массивы предсказанных значений x и y
    """
    # Предсказанные точки в пределах исходного интервала
    x_pred_within = np.linspace(min(x_values), max(x_values), 10)
    y_pred_within = [newton_poly(coefficients, x_values, x) for x in x_pred_within]
    
    # Предсказанные точки за пределами исходного интервала
    x_pred_extra = np.linspace(max(x_values), max(x_values) + num_extra_points * (x_values[1] - x_values[0]), num_extra_points)
    y_pred_extra = [newton_poly(coefficients, x_values, x) for x in x_pred_extra]
    
    return x_pred_within, y_pred_within, x_pred_extra, y_pred_extra