CREATE TABLE patients_with_uuid (
    patient_uuid UUID PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    age INT,
    gender VARCHAR(10),
    diagnosis VARCHAR(255)
);

-- Inserting 20 patients with generated UUIDs
INSERT INTO patients_with_uuid (patient_uuid, first_name, last_name, age, gender, diagnosis)
VALUES 
  (gen_random_uuid(), 'John', 'Doe', 45, 'Male', 'Hypertension'),
  (gen_random_uuid(), 'Jane', 'Smith', 30, 'Female', 'Asthma'),
  (gen_random_uuid(), 'Robert', 'Johnson', 54, 'Male', 'Diabetes'),
  (gen_random_uuid(), 'Linda', 'Brown', 25, 'Female', 'Migraine'),
  (gen_random_uuid(), 'Michael', 'Williams', 60, 'Male', 'Heart Disease'),
  (gen_random_uuid(), 'Susan', 'Jones', 38, 'Female', 'Arthritis'),
  (gen_random_uuid(), 'James', 'Garcia', 47, 'Male', 'Sleep Apnea'),
  (gen_random_uuid(), 'Patricia', 'Martinez', 22, 'Female', 'Allergies'),
  (gen_random_uuid(), 'David', 'Rodriguez', 70, 'Male', 'Cancer'),
  (gen_random_uuid(), 'Barbara', 'Lopez', 50, 'Female', 'Thyroid Disorder'),
  (gen_random_uuid(), 'Charles', 'Gonzalez', 65, 'Male', 'COPD'),
  (gen_random_uuid(), 'Mary', 'Wilson', 28, 'Female', 'Depression'),
  (gen_random_uuid(), 'Joseph', 'Anderson', 33, 'Male', 'Anxiety'),
  (gen_random_uuid(), 'Karen', 'Thomas', 40, 'Female', 'Osteoporosis'),
  (gen_random_uuid(), 'Christopher', 'Taylor', 53, 'Male', 'Chronic Pain'),
  (gen_random_uuid(), 'Nancy', 'Moore', 29, 'Female', 'PCOS'),
  (gen_random_uuid(), 'Daniel', 'Jackson', 48, 'Male', 'Hypertension'),
  (gen_random_uuid(), 'Betty', 'Martin', 34, 'Female', 'IBS'),
  (gen_random_uuid(), 'Mark', 'Lee', 52, 'Male', 'Stroke'),
  (gen_random_uuid(), 'Sandra', 'Perez', 61, 'Female', 'Alzheimer');
