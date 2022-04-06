CREATE TABLE IF NOT EXISTS users(
  userID SERIAL PRIMARY KEY,
  firstName VARCHAR(45) NOT NULL,
  lastName VARCHAR(45) NOT NULL,
  DOB DATE NOT NULL,
  username VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL
);

DROP TABLE IF EXISTS drinks CASCADE;
CREATE TABLE IF NOT EXISTS drinks(
  drinkID INT NOT NULL,
  drinkName VARCHAR(45) NOT NULL,
  ingredients VARCHAR(45) NOT NULL,
  other VARCHAR(45) NOT NULL
);

DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE IF NOT EXISTS favorites (
  drinkID INT NOT NULL,
  userID INT NOT NULL,
  drinkName VARCHAR(45) NOT NULL,
  Rating VARCHAR(45) NULL DEFAULT NULL,                              
  PRIMARY KEY(drinkID)
);

INSERT INTO drinks(drinkID, drinkName, ingredients, other)
VALUES(1, 'oldfashioned', 'liq', 'none');