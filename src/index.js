const express = require('express');
const app = express();
const morgan = require('morgan');
const routes = require('./routes');

//settings
app.set('port', 3001);

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use('/', routes);

//starting the server
app.listen(app.get('port'), () => {
	console.log('listen on port 3001');
});

module.exports = app;
