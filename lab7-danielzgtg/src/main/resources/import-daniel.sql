INSERT INTO book (id, category, title, cost, year)
VALUES (1001, 'Tech', 'Introduction to Angular', 50.25, 2017),
       (1002, 'Tech', 'Angular Advanced Concepts', 125.95, 2019),
       (1003, 'Kids', 'A Fantastic Story', 12.25, 2009),
       (1004, 'Cook', 'The Best Shawarmas', 18.99, 1978),
       (1005, 'Tech', 'Angular Demystified', 210.50, 2020);
INSERT INTO author (id, first_name, last_name)
VALUES (11, 'Bob', 'T'),
       (21, 'Zorb', 'Tar'),
       (31, 'Jane', 'C'),
       (32, 'Tala', 'Tolo'),
       (41, 'Chef', 'Z');
INSERT INTO author_books (authors_id, books_id)
VALUES (11, 1001),
       (21, 1002),
       (31, 1003),
       (32, 1003),
       (41, 1004),
       (21, 1005);
