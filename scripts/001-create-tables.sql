-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration INTEGER NOT NULL, -- in minutes
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(255),
  service_id INTEGER REFERENCES services(id),
  booking_date DATE NOT NULL,
  booking_time TIME NOT NULL,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample services
INSERT INTO services (name, description, duration, price) VALUES
('เจลเล็บสีพื้น', 'ทาเจลเล็บสีพื้นธรรมดา สวยงามและทนทาน', 60, 350.00),
('เจลเล็บลายศิลป์', 'เจลเล็บพร้อมลายศิลป์สวยงาม ออกแบบตามต้องการ', 90, 550.00),
('ต่อเล็บเจล', 'ต่อเล็บเจลให้ยาวสวย พร้อมทาสีตามต้องการ', 120, 750.00),
('มานิเคียร์', 'ดูแลเล็บมือ ตัดแต่งเล็บ และบำรุงมือ', 45, 250.00),
('เพดิเคียร์', 'ดูแลเล็บเท้า ตัดแต่งเล็บ และบำรุงเท้า', 60, 300.00),
('ถอดเจลเล็บ', 'ถอดเจลเล็บเก่าและบำรุงเล็บ', 30, 150.00);
