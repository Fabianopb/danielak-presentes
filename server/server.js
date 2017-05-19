var express = require('express');
var app = express();
var path = require('path');
var mongoose = require('mongoose');
// var users = require('./routes/users');
// var beers = require('./routes/beers');
// var passport = require('passport');

// app.use(passport.initialize());

// app.use('/user', users);
// app.use('/beers', beers);

mongoose.connect(process.env.DANIK_MONGODB);

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/api', function(request, response) {
  response.json('Server with nodemon up and running!');
});

app.listen(process.env.PORT || 9000);
console.log('Listening on port 9000...');
