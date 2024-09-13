CREATE TABLE blood_tests (
    test_id SERIAL PRIMARY KEY,
    patient_id INTEGER REFERENCES patients(patient_id),
    test_date DATE,
    test_type VARCHAR(50),
    result_value DECIMAL(10, 2),
    result_unit VARCHAR(20)
);

INSERT INTO blood_tests (patient_id, test_date, test_type, result_value, result_unit)
VALUES
(1, '2024-01-15', 'Hemoglobin', 13.5, 'g/dL'),
(1, '2024-01-15', 'Cholesterol', 190.0, 'mg/dL'),
(2, '2024-01-16', 'Hemoglobin', 14.2, 'g/dL'),
(2, '2024-01-16', 'Cholesterol', 205.0, 'mg/dL'),
(3, '2024-01-17', 'Hemoglobin', 12.8, 'g/dL'),
(3, '2024-01-17', 'Cholesterol', 180.0, 'mg/dL'),
(4, '2024-01-18', 'Hemoglobin', 13.0, 'g/dL'),
(4, '2024-01-18', 'Cholesterol', 220.0, 'mg/dL'),
(5, '2024-01-19', 'Hemoglobin', 13.7, 'g/dL'),
(5, '2024-01-19', 'Cholesterol', 195.0, 'mg/dL'),
(6, '2024-01-20', 'Hemoglobin', 14.0, 'g/dL'),
(6, '2024-01-20', 'Cholesterol', 210.0, 'mg/dL'),
(7, '2024-01-21', 'Hemoglobin', 13.3, 'g/dL'),
(7, '2024-01-21', 'Cholesterol', 185.0, 'mg/dL'),
(8, '2024-01-22', 'Hemoglobin', 12.9, 'g/dL'),
(8, '2024-01-22', 'Cholesterol', 200.0, 'mg/dL'),
(9, '2024-01-23', 'Hemoglobin', 14.1, 'g/dL'),
(9, '2024-01-23', 'Cholesterol', 230.0, 'mg/dL'),
(10, '2024-01-24', 'Hemoglobin', 13.6, 'g/dL'),
(10, '2024-01-24', 'Cholesterol', 185.0, 'mg/dL');