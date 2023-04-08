const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const unicornModel = require("./models/unicorns");

app.post("/search", async (req, res) => {
  // for name search
  if (req.body.type === "nameSearch") {
    let selectionArgument = {};
    if (req.body.name) {
      selectionArgument = { name: req.body.name };
    }
    let projectionArgument = {};
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === false &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = { weight: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = {name: 1, weight: 1, _id: 0};
    } else {
      projectionArgument = {};
    }

    const result = await unicornModel.find(
      selectionArgument,
      projectionArgument
    );
    res.json(result);
  } else if (req.body.type === "weightSearch") {
    let selectionArgument = {};
    if (req.body.min_weight && req.body.max_weight) {
      selectionArgument = {
        weight: { $gte: parseInt(req.body.min_weight), $lte: parseInt(req.body.max_weight) }
      };
      console.log(selectionArgument);
    }
    let projectionArgument = {};
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === false &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = { weight: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = {name: 1, weight: 1, _id: 0};
    } else {
      projectionArgument = {}
    }

    const result = await unicornModel.find(
      selectionArgument,
      projectionArgument
    );
    res.json(result);
  } else if (req.body.type === "foodSearch") {
    let selectionArgument = {};
    if (req.body.food1 === "definetly not in" || req.body.food2 === "definetly not in") {
      selectionArgument = {
        $or: [
          {"loves": {$in : [req.body.food1]}},
          {"loves": {$in : [req.body.food2]}},
        ]
      };
  } else {
    selectionArgument = {"loves" : { $all: [req.body.food1, req.body.food2]}}
  }
  let projectionArgument = {};
    if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === false
    ) {
      projectionArgument = { name: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === false &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = { weight: 1, _id: 0 };
    } else if (
      req.body.projectionFilters.name === true &&
      req.body.projectionFilters.weight === true
    ) {
      projectionArgument = {name: 1, weight: 1, _id: 0};
    } else {
      projectionArgument = {}
    }
    const result = await unicornModel.find(
      selectionArgument,
      projectionArgument
    );
    res.json(result);
}
});

module.exports = app;
