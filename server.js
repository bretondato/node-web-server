const express = require('express');
const hbs = require('hbs');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname,'public')));

app.use(function (req, res, next) {
    var now = new Date().toString();
    var log = now + ' ' + req.method + ' ' + req.url + ' ' + req.ip + '\n';

    fs.appendFile('serverLog.log', log, function (err) {
        if(err){
            console.log('Unable to append to serverLog file');
        }
    });

    next();
});

hbs.registerHelper('getCurrentYear', function () {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function (text) {
   return text.toUpperCase();
});


app.get('/', function (req, res) {
    res.render('home.hbs', {
        pageTitle: 'Home page',
        welcomeMessage:'Ola Bem Vindo ao Bretondato Site'
    });
});

app.get('/about', function (req, res) {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

app.get('/bad', function (req, res) {
    res.send({
        errorMessage:"Unable to handle request"
    });
});

app.get('/projects', function (req, res) {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: 'You are at Projects Page'
    })
});

app.listen(port, function () {
    console.log('App listening at port ' + port);
});
