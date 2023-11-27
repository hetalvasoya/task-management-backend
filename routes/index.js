const app = require('express')();

const user = require('./user.route');
const task = require('./task.route');

app.use('/', user);
app.use('/task', task);

module.exports = app;