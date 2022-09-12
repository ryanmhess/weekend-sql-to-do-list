-- set up a database named 'toDoList'
-- run this SQL command to set up the table.
CREATE TABLE "toDoList" 
	(
	"id" SERIAL PRIMARY KEY,
	"priority" VARCHAR(25) NOT NULL,
	"adventurer" VARCHAR(50) NOT NULL,
	"location" VARCHAR (25) NOT NULL,
    "details" VARCHAR(250) NOT NULL,
    "start" VARCHAR,
    "finish" VARCHAR, 
    "complete" BOOLEAN
    );
    
-- test data
INSERT INTO "toDoList" (priority, adventurer, location, details, start, finish, complete)
	VALUES
		('HIGH', 'Ryan', 'Kitchen', 'Clean out stove and counter tops', '12:20 pm', null, false),
		('MEDIUM', 'Julia', 'Bathroom', 'Wipe down toilet and shower', '1:34 pm', '2:16 pm', true),
		('LOW', 'Emily', 'Pets', 'Kitty litter', '9:34 am', null, false),
		('HIGH', 'Ian', 'Bedroom', 'Pick up toys and make bed', '11:34 am', null, false),
		('MEDIUM', 'Kellen', 'Bedroom', 'Put away clean clothes and bring down dirty clothes', '10:34 am', null, false),
		('LOW', 'Ryan', 'Garage', 'Prep garage for winter', '7:54 pm', '853 pm', true),
		('HIGH', 'Kellen', 'Self', 'Cut my snaggle toothed toenails', '11:00 am', null, false),
		('MEDIUM', 'Emily', 'Bedroom', 'Put away your clothes', '8:14 am', null, false);