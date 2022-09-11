-- set up a database named 'toDoList'
-- run this SQL command to set up the table.
CREATE TABLE "toDoList" 
	(
	"id" SERIAL PRIMARY KEY,
	"priority" VARCHAR(25) NOT NULL,
	"owner" VARCHAR(50) NOT NULL,
	"task" VARCHAR (25) NOT NULL,
    "details" VARCHAR(250) NOT NULL,
    "start" VARCHAR,
    "finish" VARCHAR, 
    "complete" BOOLEAN
    );
    
-- test data
INSERT INTO "toDoList" (priority, owner, task, details, start, complete)
	VALUES
		('high', 'Ryan', 'Kitchen', 'Clean out stove and counter tops', '12:20 pm', false),
		('medium', 'Julia', 'Bathroom', 'Wipe down toilet and shower', '1:34 pm', true),
		('low', 'Emily', 'Pets', 'Kitty litter', '9:34 am', false),
		('high', 'Ian', 'Bedroom', 'Pick up toys and make bed', '11:34 am', false),
		('medium', 'Kellen', 'Bedroom', 'Put away clean clothes and bring down dirty clothes', '10:34 am', false),
		('low', 'Ryan', 'Garage', 'Prep garage for winter', '7:54 pm', true);