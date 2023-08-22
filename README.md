# my-express-app

This Eurocapi MVP projects what a traveling-through-Europe website could look like.

## Built With

* React
* HTML
* CSS
* JavaScript
* ReactRouter
* MySQL
* Node.js
* Express.js

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called eurocapi: `create database eurocapi;`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=eurocapi
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables in your database: "capital," "user," and "post".

- Make sure you understand how the tables are constructed. In your MySQL console, you can run `use eurocapi;` and then `describe TABLENAME;` to see the structure of each table.

### Development

- Run `npm start` in project directory to start the Express server on port 4000
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

## Database Structure

![Captura de pantalla 2023-08-16 a les 0 59 00](https://github.com/mariagimenezbustos/my-express-app/assets/134734638/f8e16633-6e10-4f58-bdd6-dcfa728960f2)
