const express = require('express');

const router = express.Router();
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function readList() {
  const data = await readFile('./lectures.json');
  const json = JSON.parse(data);
  return json;
}

async function list(req, res) {
  const title = 'Fyrirlestrar';
  const category = 'Vefforritun';
  const data = await readList();
  const { lectures } = data;

  res.render('lectures', { title, category, lectures });
}

async function lecture(req, res, next) {
  /* todo útfæra */
  const { slug } = req.params;
  const data = await readList();
  const { lectures } = data;
  const foundLecture = lectures.find(a => a.slug === slug);

  if (!foundLecture) {
    return next();
  }
  return res.render('lecture', { title: foundLecture.title, category: foundLecture.category, lecture: foundLecture });
}


router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
