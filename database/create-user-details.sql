CREATE TABLE IF NOT EXISTS userDetails(
	uid VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    coins INT NOT NULL DEFAULT 0,
    profilePictureUrl VARCHAR(255) NOT NULL DEFAULT "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    PRIMARY KEY(uid)
);