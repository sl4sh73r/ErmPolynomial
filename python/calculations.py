import sys
import numpy as np
from data_processing import (
    load_data_from_excel, polynomial_to_string, create_system_of_equations,
    lagrange_polynomial_to_latex, get_predicted_points, monte_carlo,
    linear_regression, moving_average, least_squares_approximation,
    monte_carlo_plot, multivariable_function
)
from plotting import plot_graph, predicted_points_table

# Глобальные переменные для хранения значений x, y и коэффициентов полинома
x_values = np.array([])
y_values = np.array([])
coefficients = np.array([])

def update_globals(data):
    global x_values, y_values, coefficients
    x_values, y_values, coefficients = data

if __name__ == "__main__":
    command = sys.argv[1]
    file_path = sys.argv[2] if len(sys.argv) > 2 else None
    method = sys.argv[3] if len(sys.argv) > 3 else None

    if command == "load":
        data = load_data_from_excel(file_path)
        update_globals(data)
        print("Data loaded successfully")
    elif command == "polynomial":
        data = load_data_from_excel(file_path)
        update_globals(data)
        result = polynomial_to_string(coefficients, x_values)
        print(result)
    elif command == "equations":
        data = load_data_from_excel(file_path)
        update_globals(data)
        result = create_system_of_equations(coefficients, x_values, y_values)
        print(result)
    elif command == "plot":
        data = load_data_from_excel(file_path)
        update_globals(data)
        result = plot_graph(x_values, y_values, coefficients, method)
        print(result)
    elif command == "predicted_points":
        data = load_data_from_excel(file_path)
        update_globals(data)
        x_pred_within, y_pred_within, x_pred_extra, y_pred_extra = get_predicted_points(x_values, coefficients)
        result = predicted_points_table(x_pred_within, y_pred_within) + predicted_points_table(x_pred_extra, y_pred_extra)
        print(result)
    elif command == "monte_carlo":
        data = load_data_from_excel(file_path)
        update_globals(data)
        result = monte_carlo(x_values, y_values)
        print(result)
    else:
        print(f"Unknown command: {command}")