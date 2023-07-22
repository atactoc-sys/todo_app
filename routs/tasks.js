const express = require('express');
const router = express.Router();
const Task = require('../models/task');

// Rendering the App Page
router.get('/', function(req, res) {
  Task.find({}, function(err, tasks) {
    if (err) {
      console.log('Error in fetching tasks from db');
      return;
    }

    return res.render('home', {
      title: "Home",
      tasks: tasks
    });
  });
});

// Creating Tasks
router.post('/create-task', function(req, res) {
  Task.create({
    description: req.body.description,
    category: req.body.category,
    date: req.body.date
  }, function(err, newTask) {
    if (err) {
      console.log('error in creating task', err);
      return;
    }

    // console.log(newTask);
    return res.redirect('back');
  });
});

// Deleting Tasks
router.get('/delete-task', function(req, res) {
  // Get the id from query
  const idsToDelete = Object.keys(req.query);

  Task.deleteMany({ _id: { $in: idsToDelete } }, function(err) {
    if (err) {
      console.log('error in deleting task');
    }

    return res.redirect('back');
  });
});

module.exports = router;
