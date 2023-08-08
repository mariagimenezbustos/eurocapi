var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ title: 'Express' });
});

/* GET all capitals */
router.get("/capitals", async (req, res) => {
  try {
    const results = await db("SELECT * FROM capital ORDER BY id ASC;");
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET capital by id */
router.get("/capitals/cities/:capital_id", async (req, res) => {
  const id = req.params.capital_id;

  try {
    const results = await db(`SELECT * FROM capital WHERE id = ${id};`);
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* GET capitals by language */
router.get("/capitals/:language", async (req, res) => {
  const language = req.params.language;

  try {
    const results = await db(`SELECT * FROM capital WHERE language LIKE "%${language}%";`);
    res.send(results.data);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* PUT population by id */
router.put("/capitals/cities/:capital_id", async (req, res) => {
  const id = req.params.capital_id;
  const { population } = req.body;
  console.log("REQ.BODY", req.body);

  try {
    await db(`UPDATE capital SET population = ${population} WHERE id = ${id};`);
    const results = await db("SELECT * FROM capital;");
    res.send(results.data);
  } catch (error) {
    console.log("something not working", error);
    res.status(500).send(error);
  }
});

module.exports = router;
