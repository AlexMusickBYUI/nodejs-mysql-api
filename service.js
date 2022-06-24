const express = require('express');
const app = express();
const mysql = require('mysql');

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

async function testquery() {
    await connection.connect();
    await connection.query("SELECT * FROM customer", function (error, result, field) {
        if (error) throw error;
        console.log(result[0]);
    })
    connection.end();
}

app.post("/query", async(request, response) => {
    await connection.connect();
    try {
        await connection.query(request, function (error, result, field) {
            response.send(result);
            response.status(200);
        })
    } catch {
        response.send("Query error");
        response.status(422);
        console.log("Query error from client")
    }
});