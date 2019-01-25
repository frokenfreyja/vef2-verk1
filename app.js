/* todo, setja upp express */
const express = require('express');

const app = express();
const path = require('path');
const lectures = require('./lectures');
const content = require('./content');

app.locals.setContent = content;

// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));


app.use('/', lectures);

// index page
app.get('/', (req, res) => {
  res.render('lectures', { title: 'Forsíða' });
});


function notFoundHandler(req, res, next) { /* eslint-disable-line */
  const title = 'Fannst ekki';
  const message = 'Ó nei, efnið finnst ekki!';
  res.status(404).render('error', { title, message });
}

function errorHandler(err, req, res, next) { /* eslint-disable-line */
  console.error(err);
  const title = 'Villa kom upp';
  const message = '';
  res.status(500).render('error', { title, message });
}

app.use(notFoundHandler);
app.use(errorHandler);

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.info(`Server running at http://${hostname}:${port}/`); /* eslint-disable-line */
});
