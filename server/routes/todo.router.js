const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();
const dayjs = require('dayjs')
const pool = require('../modules/pool.js');

//-----------------------------------------------------------------//
//  GET
//
//  This function asks for the table data from the toDoList and 
//  sets an order for sorting the received data.

toDoRouter.get('/', (req, res) => {
    console.log('In GET Route');
    let sqlQuery = `
        SELECT * FROM "toDoList"
            ORDER BY CASE
                WHEN "complete" = 'true' then 4
                WHEN "priority" = 'HIGH' then 1
                WHEN "priority" = 'MEDIUM' then 2
                WHEN "priority" = 'LOW' then 3
                END ASC;
    `
    pool.query(sqlQuery)
        .then((dbRes) => {
            let tasks = dbRes.rows;
            res.send(tasks);
        }).catch((error) => {
            console.log('The db query in GET /todo was unsuccessful:', error);
            res.sendStatus(500);
        });
});

//-----------------------------------------------------------------//
//  POST
//
//  This function receives a new task from the client via input 
//  values, adds a start time and inserts as a new row in the
//  database.

toDoRouter.post('/', (req, res) => {
    console.log('In POST Route');
    let newTask = req.body;
    let newStartTime = dayjs(newTask.start).format('h:mm a');
    newTask.start = newStartTime;
    let queryText = `
        INSERT INTO "toDoList"
            ("priority", "adventurer", "location", "details", "start", "complete")
            VALUES
            ($1, $2, $3, $4, $5, $6);
    `;
    pool.query(queryText, [newTask.priority, newTask.adventurer, newTask.location, newTask.details, newTask.start, newTask.complete])
        .then((postRes) => {
            console.log('The POST /todo was successful');
            res.sendStatus(201);
        }).catch((error) => {
            console.log('The POST /todo was unsuccessful:', error);
            res.sendStatus(500);
        });
});

//-----------------------------------------------------------------//
//  DELETE
//
//  This deletes a row from the database whose id value matches
//  that of the data received from the request.

toDoRouter.delete('/:idToDelete', (req, res) => {
    console.log('In DELETE Route');
    let deleteId = req.params.idToDelete;
    let sqlValue = [deleteId];
    let sqlQuery = `
        DELETE FROM "toDoList"
            WHERE "id" = $1;
    `
    pool.query(sqlQuery, sqlValue)
        .then((deleteRes) => {
            console.log('The DELETE /todo was successful');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('The DELETE /todo was unsuccessful:', error);
            res.sendStatus(500);
        });
});

//-----------------------------------------------------------------//
//  PUTgit s
//
//  This function sets a finish time and changes the complete
//  value to true on the row with an id matching that of the
//  data received in the request.

toDoRouter.put('/:idToComplete', (req, res) => {
    console.log('In PUT Route (COMPLETE)');
    let completeId = req.params.idToComplete;
    let finishDateTime = dayjs(new Date().toLocaleString()).format('h:mm a');
    let sqlValue = [completeId];
    let sqlQuery = `
        UPDATE "toDoList"
            SET "finish" = '${finishDateTime}', "complete" = 'true'
            WHERE "id" = $1;
    `
    pool.query(sqlQuery, sqlValue)
        .then((completeRes) => {
            console.log('The PUT (COMPLETE) /todo was successful');
            res.sendStatus(200);
        }).catch((error) => {
            console.log('The PUT (COMPLETE) /todo was unsuccessful', error);
            res.sendStatus(500);
        });
});

module.exports = toDoRouter;