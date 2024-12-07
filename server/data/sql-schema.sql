-- This was auto generated using ChatGPT
-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    picture TEXT,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    total_steps_taken INT DEFAULT 0,
    total_distance_traveled INT DEFAULT 0,
    total_calories_burned INT DEFAULT 0,
    total_active_minutes INT DEFAULT 0,
    average_intensity INT DEFAULT 0
);

-- Friends Table (Relationship between users)
CREATE TABLE friends (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    friend_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, friend_id)
);

-- Stats Table (General statistics, can be expanded for more stats)
CREATE TABLE stats (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    steps_taken INT DEFAULT 0,
    distance_traveled INT DEFAULT 0,
    calories_burned INT DEFAULT 0,
    active_minutes INT DEFAULT 0,
    average_intensity INT DEFAULT 0
);

-- Posts Table
CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_date DATE NOT NULL,
    steps_taken INT DEFAULT 0,
    distance_traveled INT DEFAULT 0,
    calories_burned INT DEFAULT 0,
    active_minutes INT DEFAULT 0,
    workout_intensity INT DEFAULT 0
);

-- Credentials Table (Handle and Password for login)
CREATE TABLE credentials (
    user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
    handle TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    PRIMARY KEY (user_id)
);
