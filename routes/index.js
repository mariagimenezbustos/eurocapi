var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.send({ title: 'Express' });
// });

// /* GET all capitals */
// router.get("/capitals", async (req, res) => {
//   console.log(req.query);
//   try {
//     const results = await db("SELECT * FROM capital ORDER BY id ASC;");
//     res.send(results.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });
// /* GET filtering */
// router.get("/capitals", async (req, res) => {
//   const search = req.query.search;
//   console.log("SQL Query:", search);

//   try {
//   const query = `SELECT * FROM capital WHERE name LIKE "%${search}%" OR country LIKE "%${search}%" OR language LIKE "%${search}%";`;
//     const searchParam = `%${search}%`;
//     const results = await db(query, [searchParam, searchParam, searchParam]);
//     res.send(results.data);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

/* GET all capitals or filtering */
router.get("/capitals", async (req, res) => {
  if (!req.query.search) {
    console.log(req.query);
    try {
      const results = await db("SELECT * FROM capital ORDER BY id ASC;");
      res.send(results.data);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    const search = req.query.search;
    console.log("SQL Query:", search);
  
    try {
    const query = `SELECT * FROM capital WHERE name LIKE "%${search}%" OR country LIKE "%${search}%" OR language LIKE "%${search}%" OR currency LIKE "%${search}%";`;
      const searchParam = `%${search}%`;
      const results = await db(query, [searchParam, searchParam, searchParam, searchParam]);
      res.send(results.data);
    } catch (error) {
      res.status(500).send(error);
    } 
  }
});

/* GET capital by id */
router.get("/capitals/:capital_id", async (req, res) => {
  const id = req.params.capital_id;

  try {
    const results = await db(`SELECT * FROM capital WHERE id = ${id};`);
    res.send(results.data[0]);
  } catch (error) {
    res.status(500).send(error);
  }
});

/* UPDATE population by id */
router.put("/capitals/:capital_id", async (req, res) => {
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

/* POST comment in capital */
// router.post("/capitals/:capital_id", async (req, res) => {
//   const id = req.params.capital_id;
//   const { title, description, local, date } = req.body;
  
//   try {
//     await db(`INSERT INTO post (title, description, local, date) VALUES ("${title}", "${description}", ${local}, "${date}");`);
//     const results = await db("")
//   } catch (error) {
//     console.log("comment not posted", error);
//     res.status(500).send(error);
//   }
// });

/* DELETE comment in capital */


module.exports = router;
