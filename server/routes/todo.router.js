const { Router } = require('express');
const express = require('express');
const toDoRouter = express.Router();

const pool = require('../modules/pool.js');

//  GET

toDoRouter.get('/', (req, res) => {
    console.log('In GET Route');
    const sqlQuery = `
        SELECT * FROM "toDoList"
            ORDER BY "start";
    `
    pool.query(sqlQuery)
        .then((dbRes) => {
            let tasks = dbRes.rows;
            res.send(tasks);
        }).catch((error) => {
            console.log('The db query in GET /todo was unsuccessful:', error);
            res.sendStatus(500);
        })
})

//  POST

//  DELETE

//  PUT

module.exports = toDoRouter;