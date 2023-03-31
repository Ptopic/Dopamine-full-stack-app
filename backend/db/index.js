// mysql -h sql957.main-hosting.eu -u u533381764_users -D u533381764_users -p

const mysql = require('mysql2');

const db = mysql.createPool({
	host: 'sql957.main-hosting.eu',
	user: 'u533381764_users',
	password: 'N8Vx3nLW$',
	database: 'u533381764_users',
	multipleStatements: true
});

module.exports = db;
