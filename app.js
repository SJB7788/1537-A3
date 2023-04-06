const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(cors());

app.use(express.json());

const unicornModel = require('./models/unicorns');

app.post('/search', async (req, res) => {
  console.log(req.body);
  if (req.body.type === 'nameSearch') {
    let seletctionArgument = {};
    if (req.body.name) {
      seletctionArgument = { name: req.body.name };
    }
    let projectionArgument = {};
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, _id: 0 };
    } else {
      //Todo
    }

    const result = await unicornModel.find(
      seletctionArgument,
      projectionArgument
    );
    res.json(result);
  } else if (req.body.type === 'weightSearch') {
  } else if (req.body.type === 'foodSearch') {
  }
});

module.exports = app;
