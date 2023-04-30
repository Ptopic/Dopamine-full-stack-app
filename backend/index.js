const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

require('dotenv').config();

const userRouter = require('./routes/user');
const codesRouter = require('./routes/codes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(epxress.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/code', codesRouter);

// app.get('/login', (req, res) => {
// 	const sqlSelect = `SELECT * FROM fonts`;
// 	db.query(sqlSelect, (err, result) => {
// 		if (err) {
// 			throw err;
// 		}
// 		res.send(result);
// 		console.log(result);
// 	});
// });

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
