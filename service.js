const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = 50001

//This data will definitely need to be changed
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'student',
    password : 'student',
    database : 'sakila'
  });

app.listen(port, async() => {
    console.log("Listening on port", port)
});

async function testQuery() {
    await connection.query("SELECT * FROM customer", function (error, result, field) {
        if (error) throw error;
        console.log(result[0]);
    })
}

app.get("/query", async(request, response) => {
    query = request.body.query;
    console.log(query);
    try {
        await connection.query(query, function (error, result, field) {
            response.send(result[0]);
            response.status(200);
        })
    } catch {
        response.send("Query error");
        response.status(422);
        console.log("Query error from client");
    }
});