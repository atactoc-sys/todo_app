const express = require('express');
const app = express();
const db = require('./config/mongoose');
const Task = require('./models/task');
const tasksRoutes = require('./routes/tasks');

const port = 7000;

app.use(express.static("./views"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', './views');

// Using the tasksRoutes for handling the tasks-related routes
app.use('/', tasksRoutes);

app.listen(port, function(err) {
  if (err) {
    console.log(`Error in running the server : ${err}`);
    return;
  }

  console.log(`Server is running on port : ${port}`);
});
