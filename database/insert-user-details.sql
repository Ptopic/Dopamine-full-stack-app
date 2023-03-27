INSERT INTO userDetails
(uid, userName, dateOfBirth, profilePictureUrl, coins) 
VALUES ("23232", "pero", "2018-11-23", "https", 200);

-- Insert without profile picture default stays the same

INSERT INTO userDetails
(uid, userName, dateOfBirth, coins) 
VALUES ("232323232", "pero", "2022-11-23", 999);

-- Insert without coins or profile picture

INSERT INTO userDetails
(uid, userName, dateOfBirth) 
VALUES ("2323232323231", "pero", "2022-11-23");

SELECT * FROM userDetails