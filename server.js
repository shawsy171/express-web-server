const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  const now = new Date().toString();

  const log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log.');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//   })
// })

// helper function
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

// helper function that takes an arguement
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// register midddleware
app.use(express.static(__dirname + '/public'))

// routing for home page 
app.get('/',(req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to your first real attempt at building an app in node Congratulations'
  });
});

// routing for about page
app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  })
});

// routing for bad page example
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Some thing went wrong'
  })
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
