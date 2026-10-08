-- SAFEZONE AI - Smart Hazard Mapping & Relocation System
-- MySQL Schema & Seed Script

CREATE DATABASE IF NOT EXISTS safezone;
USE safezone;

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS alerts;
DROP TABLE IF EXISTS risk_assessments;
DROP TABLE IF EXISTS population;
DROP TABLE IF EXISTS disasters;
DROP TABLE IF EXISTS weather_data;
DROP TABLE IF EXISTS shelters;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS users;

-- 1. Users table (Admin & Authorized Personnel)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'officer',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. Locations table
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    elevation DECIMAL(8, 2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Weather Data table
CREATE TABLE weather_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    rainfall DECIMAL(8, 2) DEFAULT 0.00,
    temperature DECIMAL(5, 2) DEFAULT 0.00,
    humidity DECIMAL(5, 2) DEFAULT 0.00,
    wind_speed DECIMAL(6, 2) DEFAULT 0.00,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Disasters table
CREATE TABLE disasters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    disaster_type VARCHAR(50) NOT NULL,
    severity VARCHAR(20) NOT NULL,
    date DATE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. Population table
CREATE TABLE population (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    population INT NOT NULL DEFAULT 0,
    households INT NOT NULL DEFAULT 0,
    vulnerable_population INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 6. Risk Assessments table
CREATE TABLE risk_assessments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    hazard_type VARCHAR(50) NOT NULL,
    risk_score INT NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 7. Shelters table
CREATE TABLE shelters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    capacity INT NOT NULL,
    occupancy INT NOT NULL DEFAULT 0,
    accessibility VARCHAR(50) DEFAULT 'Good',
    safety_status VARCHAR(50) DEFAULT 'Approved',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 8. Alerts table
CREATE TABLE alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    hazard_type VARCHAR(50) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================================
-- INITIAL SEED DATA FOR DEMO
-- ============================================================================

INSERT INTO users (name, email, password, role) VALUES
('Emergency Chief Officer', 'admin@safezone.ai', 'pbkdf2:sha256$260000$safezonekey$hashedadminpass', 'admin'),
('Relocation Field Analyst', 'analyst@safezone.ai', 'pbkdf2:sha256$260000$safezonekey$hashedanalystpass', 'officer');

INSERT INTO locations (name, latitude, longitude, elevation) VALUES
('Kochi Coastal Zone', 9.93120000, 76.26730000, 2.50),
('Wayanad Hill Slopes', 11.68540000, 76.13200000, 850.00),
('Chennai Urban Basin', 13.08270000, 80.27070000, 6.00),
('Visakhapatnam Coast', 17.68680000, 83.21850000, 12.00),
('Uttarakhand Valley', 30.31650000, 78.03220000, 1250.00),
('Mumbai Lowlands', 19.07600000, 72.87770000, 4.00),
('Assam River Plains', 26.20060000, 92.93760000, 48.00);

INSERT INTO weather_data (location_id, rainfall, temperature, humidity, wind_speed) VALUES
(1, 210.5, 27.5, 92.0, 35.0),
(2, 285.0, 22.0, 96.0, 42.0),
(3, 165.2, 30.1, 88.0, 22.0),
(4, 190.0, 26.8, 90.0, 88.0),
(5, 220.0, 18.5, 94.0, 28.0),
(6, 240.0, 29.0, 95.0, 30.0),
(7, 175.4, 28.2, 91.0, 18.0);

INSERT INTO disasters (location_id, disaster_type, severity, date, description) VALUES
(1, 'Flood', 'EXTREME', '2024-08-14', 'Severe coastal tidal surge and heavy monsoon inundation.'),
(2, 'Landslide', 'EXTREME', '2024-07-30', 'Multiple debris flows triggered by 300mm+ 24-hr rainfall.'),
(3, 'Flood', 'HIGH', '2023-12-04', 'Cyclone Michaung heavy rainfall causing urban waterlogging.'),
(4, 'Cyclone', 'EXTREME', '2023-10-24', 'Severe cyclonic storm landfall with 90km/h gusty winds.'),
(5, 'Landslide', 'EXTREME', '2023-08-18', 'Hill slope failure cutting off primary highway supply lines.');

INSERT INTO population (location_id, population, households, vulnerable_population) VALUES
(1, 14500, 3600, 3200),
(2, 4200, 950, 980),
(3, 32000, 8100, 7500),
(4, 18500, 4500, 4100),
(5, 5400, 1300, 1100),
(6, 45000, 11200, 9200),
(7, 12800, 3200, 3100);

INSERT INTO risk_assessments (location_id, hazard_type, risk_score, risk_level) VALUES
(1, 'Flood', 92, 'EXTREME'),
(2, 'Landslide', 88, 'EXTREME'),
(3, 'Flood', 81, 'EXTREME'),
(4, 'Cyclone', 86, 'EXTREME'),
(5, 'Landslide', 84, 'EXTREME'),
(6, 'Extreme Rainfall', 94, 'EXTREME'),
(7, 'Flood', 89, 'EXTREME');

INSERT INTO shelters (name, latitude, longitude, capacity, occupancy, accessibility, safety_status) VALUES
('Kochi Central Emergency Stadium Shelter', 9.94500000, 76.28000000, 1200, 450, 'Good', 'Approved'),
('Fort Kochi High School Evacuation Center', 9.96000000, 76.24000000, 800, 620, 'Good', 'Approved'),
('Wayanad Model Relief Camp Alpha', 11.69500000, 76.14500000, 600, 380, 'Moderate', 'Approved'),
('Kalpetta Municipal Community Hall', 11.60800000, 76.08200000, 1000, 250, 'Good', 'Approved'),
('Chennai Central Indoor Stadium Shelter', 13.08300000, 80.27500000, 2500, 1800, 'Good', 'Approved'),
('Tambaram Disaster Care Center', 12.92400000, 80.12700000, 1500, 900, 'Good', 'Approved'),
('Visakhapatnam Cyclone Shelter 1', 17.71000000, 83.23000000, 1800, 1100, 'Good', 'Approved'),
('Uttarakhand Disaster Relief Camp - Dehradun', 30.32000000, 78.04000000, 900, 400, 'Good', 'Approved'),
('Mumbai BKC Transit Relief Center', 19.06500000, 72.86800000, 3500, 2900, 'Good', 'Approved');

INSERT INTO alerts (location_id, hazard_type, risk_level, message) VALUES
(1, 'Flood', 'EXTREME', 'Red Alert: Rapid water rise in low-lying coastal sectors. Immediate relocation to Kochi Central Emergency Shelter advised.'),
(2, 'Landslide', 'EXTREME', 'Flash Warning: Slope instability detected. Evacuate hill contours to Wayanad Relief Camp Alpha immediately.'),
(3, 'Flood', 'EXTREME', 'Severe Inundation Warning: Drainage capacity exceeded. Follow designated evacuation route to Indoor Stadium Shelter.'),
(4, 'Cyclone', 'EXTREME', 'Cyclone Alert: High wind speeds & storm surge warning. Move to Visakhapatnam Cyclone Shelter 1.');
