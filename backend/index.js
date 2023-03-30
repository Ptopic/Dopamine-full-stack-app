const epxress = require('express');
const app = epxress();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 3001;

require('dotenv').config();

const userRouter = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(epxress.json());

app.use('/api/user', userRouter);

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
