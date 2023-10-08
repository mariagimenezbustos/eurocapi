# my-express-app

This Eurocapi MVP projects what a traveling-through-Europe website could look like.

## Built With

- React
- HTML
- CSS
- JavaScript
- ReactRouter
- MySQL
- Node.js
- Express.js

## Setup

### Dependencies

- Run `npm install` in project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`.
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=eurocapi
  DB_PASS=YOURPASSWORD
```

- Run the following commands to your MySQL console: `CREATE DATABASE eurocapi;` and then `USE eurocapi;`
- Run `npm run migrate` in the project folder of this repository, in a new terminal window. This will create three tables in your database: "capital," "user," and "post."
- Make sure you understand how the tables are constructed. In your MySQL console, you can run `DESCRIBE tablename;` to see the structure of each table. Please mind that "tablename" in `DESCRIBE tablename` needs to be replaced by the name of the table that you want to describe.

### Development

- Run `npm start` in project directory to start the Express server on port 4000.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

### APIs

- To get the full experience of Eurocapi, please create another `.env` file, this time in the `src` folder (in the client side), and add the following:

```bash
  VITE_WEATHER_KEY=YOURAPIKEY
  VITE_PRICES_HOST=cost-of-living-and-prices.p.rapidapi.com
  VITE_RAPID_KEY=YOURAPIKEY
  VITE_HOTELS_HOST=apidojo-booking-v1.p.rapidapi.com
```

- You can find your API keys in the following links:

* For the `VITE_WEATHER_KEY`, please visit https://openweathermap.org/api, log in or sign up and generate an API key.
* For the `VITE_RAPID_KEY`, please create an account (if you don't have one already) on RapidAPI, and subscribe yourself to this Booking API https://rapidapi.com/apidojo/api/booking and to this Costs-of-Living-and-Prices API https://rapidapi.com/traveltables/api/cost-of-living-and-prices. Both of these APIs have a free plan (the Basic subscription), just make sure you stick to the request limits. You can find your API key in the "Endpoints" window of either API under the name "X-RapidAPI-key".

## Database Structure

![Captura de pantalla 2023-08-16 a les 0 59 00](https://github.com/mariagimenezbustos/my-express-app/assets/134734638/f8e16633-6e10-4f58-bdd6-dcfa728960f2)
