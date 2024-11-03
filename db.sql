CREATE DATABASE IF NOT EXISTS sms_metrics;
USE sms_metrics;
CREATE TABLE IF NOT EXISTS sms_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    country VARCHAR(50),
    operator VARCHAR(50),
    sms_sent INT,
    success_rate FLOAT
);
