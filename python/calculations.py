import sys
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import mpld3

# Устанавливаем режим без графического интерфейса
plt.switch_backend('Agg')

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

def plot_graph(x_values, y_values, coefficients):
    """
    Строит график полинома Ньютона и предсказанных точек.
    
    :param x_values: Массив значений x
    :param y_values: Массив значений y
    :param coefficients: Коэффициенты полинома Ньютона
    :return: HTML представление графика
    """
    # Создание новых значений x для построения гладкого графика
    x_new = np.linspace(min(x_values), max(x_values), 100)
    y_new = [newton_poly(coefficients, x_values, x) for x in x_new]

    # Предсказанные точки
    x_pred = np.linspace(min(x_values), max(x_values), 10)
    y_pred = [newton_poly(coefficients, x_values, x) for x in x_pred]

    # Построение графика
    fig, ax = plt.subplots(figsize=(10, 6))
    ax.plot(x_values, y_values, 'bo', label='Data points')
    ax.plot(x_new, y_new, 'r-', label='Newton Polynomial')
    ax.plot(x_pred, y_pred, 'go', label='Predicted points')  # Добавляем предсказанные точки
    ax.set_xlabel('x')
    ax.set_ylabel('y')
    ax.legend()
    ax.set_title('Newton Polynomial Interpolation')
    ax.grid(True)
    
    # Преобразование графика в HTML
    html = mpld3.fig_to_html(fig)
    plt.close(fig)
    return html

if __name__ == "__main__":
    # Основная логика выполнения скрипта
    command = sys.argv[1]
    file_path = sys.argv[2] if len(sys.argv) > 2 else None
    if command == "load":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        print(result)
    elif command == "polynomial":
        if not file_path:
            raise ValueError("No file path provided")
        load_data_from_excel(file_path)
        polynomial_str = polynomial_to_string(coefficients, x_values)
        print(polynomial_str)
    elif command == "equations":
        if not file_path:
            raise ValueError("No file path provided")
        load_data_from_excel(file_path)
        equations_str = create_system_of_equations(coefficients, x_values, y_values)
        print(equations_str)
    elif command == "plot":
        if not file_path:
            raise ValueError("No file path provided")
        load_data_from_excel(file_path)
        result = plot_graph(x_values, y_values, coefficients)
        print(result)