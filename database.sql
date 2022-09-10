-- set up a database named 'toDoList'
-- run this SQL command to set up the table.
CREATE TABLE "toDoList" 
	(
	"id" SERIAL PRIMARY KEY,
	"priority" VARCHAR(25) NOT NULL,
	"owner" VARCHAR(50) NOT NULL,
	"task" VARCHAR (25),
    "notes" VARCHAR(250),
    "start" TIMETZ (0),
    "finish" TIMETZ (0), 
    "complete" BOOLEAN
    );
    
-- test data
INSERT INTO "toDoList" (priority, owner, task, notes, start, complete)
	VALUES
		('high', 'Ryan', 'Kitchen', 'Clean out stove and counter tops', '12:20:04', false),
		('medium', 'Julia', 'Bathroom', 'Wipe down toilet and shower', '13:34:23', false),
		('low', 'Emily', 'Pets', 'Kitty litter', '09:34:12', false),
		('high', 'Ian', 'Bedroom', 'Pick up toys and make bed', '21:34:34', false),
		('medium', 'Kellen', 'Bedroom', 'Put away clean clothes and bring down dirty clothes', '10:34:36', false),
		('low', 'Ryan', 'Garage', 'Prep garage for winter', '17:54:02', false);