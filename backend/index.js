const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const port = 3001;

const db = mysql.createPool({
	host: 'sql957.main-hosting.eu',
	user: 'u533381764_users',
	password: 'N8Vx3nLW$',
	database: 'u533381764_users',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(epxress.json());

app.get('/', (req, res) => {
	const username = req.query.username;
	res.send(username);
});

app.get('/login', (req, res) => {
	const sqlSelect = `SELECT * FROM fonts`;
	db.query(sqlSelect, (err, result) => {
		if (err) {
			throw err;
		}
		res.send(result);
		console.log(result);
	});
});

app.get('/edit', (req, res) => {
	const id = req.body.id;

	console.log(id);
});

app.post('/signup', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	console.log(username);
	const sqlInsert = 'INSERT INTO users (username,password) VALUES (?, ?);';
	db.query(sqlInsert, [username, password], (err, result) => {});

	res.send('Hello world');
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
