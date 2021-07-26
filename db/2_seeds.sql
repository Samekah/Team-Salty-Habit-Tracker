INSERT INTO categories (category) 
VALUES
    ('Dietary'),
    ('Health');

INSERT INTO habits (habit, category_id) 
VALUES
    ('Drink Water', 1 ),
    ('Consume Calories', 1 ),
    ('Take Medication', 2 ),
    ('Jogging/Run', 2 );

INSERT INTO frequency (frequency_name, number_of_days) 
VALUES
    ('Daily', 1),
    ('Weekly', 7),
    ('Monthly', 30);