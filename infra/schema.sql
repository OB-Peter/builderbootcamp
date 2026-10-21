CREATE TABLE IF NOT EXISTS courses (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  price_kobo INT NOT NULL,
  description TEXT
);

CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30),
  school VARCHAR(150),
  course_id INT REFERENCES courses(id),
  reference VARCHAR(100) UNIQUE,
  payment_status VARCHAR(10) NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  reference VARCHAR(100) UNIQUE,
  amount_kobo INT,
  status VARCHAR(20),
  raw_response JSONB,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Sample course data
INSERT INTO courses (name, price_kobo, description) VALUES
  ('Backend Engineering with Node.js', 1500000, '8-week backend-focused track'),
  ('Cloud & DevOps Fundamentals', 1500000, '8-week cloud and DevOps track'),
  ('Frontend Development with React', 1500000, '8-week React frontend track');