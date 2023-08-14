var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get("/", async (req, res) => {
    console.log(req.query);
    try {
        const results = await db("SELECT * FROM user ORDER BY id ASC;");
        res.send(results.data);
    } catch (error) {
        res.status(500).send(error);
    }
});

/* GET user by user_id */
router.get("/:user_id", async (req, res) => {
    const {username} = req.params;
  
    try {
      const results = await db(`SELECT * FROM user WHERE username = "${username}";`);
  
      if (results.data.length === 1) res.send(results.data[0]);
      else res.status(404).send("User not found");
    } catch (error) {
      res.status(500).send(error);
    }
});

module.exports = router;
