const express = require('express');
const app = express();
const port = 3000;
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const router = express.Router();

const mysql = require('mysql');
const connection = mysql.createConnection(config);

async function insertName() {
    const sql = `INSERT INTO people(name) values('Lucas')`;
    connection.query(sql);
}

async function getNames() {
    const sql = `SELECT * FROM people`;
    return new Promise((data) => {
        connection.query(sql, function (err, result) {
            if (err) throw err;
            try {
                data(result);
            } catch {
                data({});
                throw err;
            }
        });
    });
}

async function buildReturn() {
    const names = await getNames();
    const title = '<h1>Full Cycle Rocks!</h1>';
    let myList = '<ul id="myList">';
    names.forEach((name) => {
        myList += `<li>${name.name}</li>`;
    });
    myList += '</ul>';
    return title + myList;
}

router.get('/', async (req, res) => {
    await insertName();
    const returnText = await buildReturn();
    res.send(returnText);
});

app.use('/', router);
app.listen(port, () => {
    console.log('Rodando na porta ' + port);
});
