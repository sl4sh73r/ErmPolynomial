import sys
import numpy as np
from data_processing import load_data_from_excel, polynomial_to_string, create_system_of_equations, lagrange_polynomial_to_latex, get_predicted_points, monte_carlo
from plotting import plot_graph, predicted_points_table

# Глобальные переменные для хранения значений x, y и коэффициентов полинома
x_values = np.array([])
y_values = np.array([])
coefficients = np.array([])

def update_globals(data):
    global x_values, y_values, coefficients
    x_values, y_values, coefficients = data

if __name__ == "__main__":
    # Основная логика выполнения скрипта
    command = sys.argv[1]
    file_path = sys.argv[2] if len(sys.argv) > 2 else None
    if command == "load":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        print("Данные загружены")
    elif command == "polynomial":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        polynomial_str = polynomial_to_string(coefficients, x_values)
        print(polynomial_str)
    elif command == "equations":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        equations_str = create_system_of_equations(coefficients, x_values, y_values)
        print(equations_str)
    elif command == "plot":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        result = plot_graph(x_values, y_values, coefficients)
        print(result)
    elif command == "lagrange":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        polynomial_latex = lagrange_polynomial_to_latex(x_values, y_values)
        print(polynomial_latex)
    elif command == "predicted_points":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        x_pred_within, y_pred_within, x_pred_extra, y_pred_extra = get_predicted_points(x_values, coefficients)
        x_pred = np.concatenate((x_pred_within, x_pred_extra))
        y_pred = np.concatenate((y_pred_within, y_pred_extra))
        result = predicted_points_table(x_pred, y_pred)
        print(result)
    elif command == "monte_carlo":
        if not file_path:
            raise ValueError("No file path provided")
        result = load_data_from_excel(file_path)
        update_globals(result)
        monte_carlo_result = monte_carlo(x_values, y_values)
        print(f"Оценка интеграла методом Монте-Карло: {monte_carlo_result}")