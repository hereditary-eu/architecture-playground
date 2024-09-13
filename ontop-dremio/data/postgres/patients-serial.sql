CREATE TABLE patients (
    patient_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    date_of_birth DATE
);

-- Insert 10 mock patients
INSERT INTO patients (first_name, last_name, date_of_birth)
VALUES
('John', 'Doe', '1985-06-15'),
('Jane', 'Smith', '1990-09-22'),
('Emily', 'Johnson', '1975-02-14'),
('Michael', 'Williams', '1980-03-11'),
('Jessica', 'Brown', '1992-11-30'),
('Chris', 'Davis', '1988-07-09'),
('Patricia', 'Miller', '1983-12-05'),
('Robert', 'Wilson', '1978-10-17'),
('Linda', 'Moore', '1995-01-25'),
('James', 'Taylor', '1982-05-19');
