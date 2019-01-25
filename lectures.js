const express = require('express');

const router = express.Router();
const util = require('util');
const fs = require('fs');

const readFile = util.promisify(fs.readFile);


function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

/**
 * Les upp alla fyrirlestra sem hafa endingu .json
 */
async function readList() {
  const data = await readFile('./lectures.json');
  const json = JSON.parse(data);
  return json;
}

/**
 * Sækir upplýsingar um alla fyrirlestra
 * @param {object} req - request
 * @param {object} res - response
 */
async function list(req, res) {
  const title = 'Fyrirlestrar';
  const category = 'Vefforritun';
  const data = await readList();
  const { lectures } = data;

  res.render('lectures', { title, category, lectures });
}

/**
 * Skrifar út stakan fyrirlestur eftir `slug` param úr route. Ef fyrirlestur finnst ekki
 * er kallað í next()
 *
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
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
