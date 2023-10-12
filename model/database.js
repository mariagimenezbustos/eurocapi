require("dotenv").config();
const mysql = require("mysql");
// const mysql = require("mysql2/promise");

const fs = require("fs");

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const STACKHERO_MYSQL_ROOT_PASSWORD = process.env.STACKHERO_MYSQL_ROOT_PASSWORD;
const STACKHERO_MYSQL_HOST = process.env.STACKHERO_MYSQL_HOST;

const con = mysql.createConnection({
  host: STACKHERO_MYSQL_HOST, // DB_HOST || "127.0.0.1",
  user: DB_USER || "root",
  password: STACKHERO_MYSQL_ROOT_PASSWORD, // DB_PASS,
  database: DB_NAME || "eurocapi",
  multipleStatements: true,
  ssl: {},
});

// (async () => {
//   const db = await mysql.createConnection({
//     host: process.env.STACKHERO_MYSQL_HOST,
//     user: "root",
//     password: process.env.STACKHERO_MYSQL_ROOT_PASSWORD,
//   });

//   // Create database stackherotest if not exists yet
//   await db.query("CREATE DATABASE IF NOT EXISTS stackherotest");

//   // Create table users if not exists yet
//   await db.query(
//     "CREATE TABLE IF NOT EXISTS `stackherotest`.`users` " +
//       "(" +
//       "`userId` INT UNSIGNED NOT NULL," +
//       "`name` VARCHAR(128) NOT NULL," +
//       "`address` TEXT NOT NULL," +
//       "`email` VARCHAR(265) NOT NULL" +
//       ") " +
//       "ENGINE = InnoDB;"
//   );

//   // Insert a fake user
//   await db.query(
//     "INSERT INTO `stackherotest`.`users` (`userId`, `name`, `address`, `email`) VALUES ?",
//     [
//       [
//         Math.round(Math.random() * 100000), // Generate a fake userId
//         "User name", // column 'name'
//         "User address", // column 'address'
//         "user@email.com", // column 'email'
//       ],
//     ]
//   );

//   // Count number of rows in table users
//   const [usersCount] = await db.query(
//     "SELECT COUNT(*) AS `cpt` FROM `stackherotest`.`users`"
//   );
//   console.log(`There is now ${usersCount[0].cpt} in table "users"`);

//   // Close the connection to MySQL
//   await db.end();
// })().catch((error) => {
//   console.error("");
//   console.error("🐞 An error occurred!");
//   console.error(error);
//   process.exit(1);
// });

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  let sql = fs.readFileSync(__dirname + "/init_db.sql").toString();
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table creation was successful!");

    console.log("Closing...");
  });

  con.end();
});
