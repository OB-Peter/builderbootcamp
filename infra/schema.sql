CREATE DATABASE IF NOT EXISTS builderbootcamp;
USE builderbootcamp;

CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price_kobo INT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  school VARCHAR(150),
  course_id INT,
  reference VARCHAR(100) UNIQUE,
  payment_status ENUM('pending','paid','failed') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS transactions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  reference VARCHAR(100) UNIQUE,
  amount_kobo INT,
  status VARCHAR(20),
  raw_response JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Sample course data
INSERT INTO courses (name, price_kobo, description) VALUES
  ('Full-Stack Web Development', 5000000, '12-week intensive full-stack bootcamp'),
  ('Backend Engineering with Node.js', 4000000, '8-week backend-focused track'),
  ('Cloud & DevOps Fundamentals', 3500000, '6-week AWS-focused DevOps track');
