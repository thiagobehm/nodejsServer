const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

//configures a variable because of heroku
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url} \n`;

  console.log(log);

  fs.appendFile('server.log', log, (error) => {
    if (error)
      console.log('Unable to log on server');
  });
  next();
});

//mainteance page
// app.use((req, res, next) => {
//   res.render('mainteance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //resp.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'Thiago',
  //   age: 23,
  //   likes: [
  //     'Video Games',
  //     'Programming',
  //     'Hanging out with friends'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home page',
    message: 'Welcome to our page'
  });

});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    message: 'I am sorry, but Server could not reach the page :('
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
