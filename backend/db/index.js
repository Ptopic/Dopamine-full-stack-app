const mysql = require('mysql2');

const db = mysql.createPool({
	host: 'sql957.main-hosting.eu',
	user: 'u533381764_users',
	password: 'N8Vx3nLW$',
	database: 'u533381764_users',
});

module.exports = db;
