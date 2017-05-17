var express = require('express');
var app = express();
// var mongoose = require('mongoose');
// var users = require('./routes/users');
// var beers = require('./routes/beers');
// var passport = require('passport');

// app.use(passport.initialize());

// app.use('/user', users);
// app.use('/beers', beers);

// mongoose.connect(process.env.BEER_CELLAR_MONGODB);

app.get('/api', function(request, response) {
  response.json('We\'re up and running!');
});

app.listen(process.env.PORT || 9000);
console.log('Listening on port 9000...');
