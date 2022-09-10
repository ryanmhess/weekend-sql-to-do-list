const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool.js');

//  GET
toDoRouter.get('/', (req, res) => {
    console.log('In GET Route');
    const sqlQuery = `
        SELECT * FROM "toDoList"
            ORDER BY CASE
                WHEN "priority" = 'high' then 1
                WHEN "priority" = 'medium' then 2
                WHEN "priority" = 'low' then 3
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

//  POST
toDoRouter.post('/', (req, res) => {
    console.log('In POST Route');
    let newTask = req.body;
    let queryText = `
        INSERT INTO "toDoList"
            ("priority", "owner", "task", "details", "start", "finish", "complete")
            VALUES
            ($1, $2, $3, $4, $5, $6, $7);
    `;
    pool.query(queryText, [newTask.priority, newTask.owner, newTask.task, newTask.details, newTask.start, newTask.finish, newTask.complete])
        .then((postRes) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('The POST /todo was unsuccessful:', error);
            res.sendStatus(500);
        });
});

//  DELETE


//  PUT


module.exports = toDoRouter;