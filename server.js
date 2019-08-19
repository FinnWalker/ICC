const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const profile = require('./routes/profile');
const likes = require('./routes/likes');
const users = require('./routes/users');
const mongoose = require('./config/database'); // Database configuration

var jwt = require('jsonwebtoken');
const app = express();

app.set('secretKey', 'nodeRestApi'); // jwt secret key

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.json({"Message" : "Nothing here."});
});


// private route
app.use('/users/likes', validateUser, likes);
app.use('/users/profile', validateUser, profile);
// public route
app.use('/users', users);



app.get('/favicon.ico', (req, res) => {
    res.sendStatus(204);
});

function validateUser(req, res, next) {
    jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
        if (err) {
            res.status(401).json({message: "Invalid token"});
        }else{
            // add user id to request
            req.body.userId = decoded.id;
            next();
        }
    });
}

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly

app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors

app.use(function(err, req, res, next) {
    console.log(err);
    if(err.status === 404) {
        res.status(404).json({message: "Not found"});
    }else{
        res.status(500).json({message: "Something went wrong"});
    }
});


app.listen(5000, () => {console.log('Server listening on port 5000')});
