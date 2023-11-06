# Eurocapi

This full-stack MVP is a traveling-through-European-capitals interactive app where the user can find information, hotels to book, and prices, as well as comments from locals and fellow tourists.

## Built With

- React (^18.2.0)
- HTML5
- CSS3
- JavaScript (ES6)
- ReactRouter (^6.14.2)
- MySQL (^2.18.1)
- Node.js (20.4.0)
- Express.js (4.16.1)

## Setup

> **Note**
> Please mind that if you're viewing the deployed version of Eurocapi you do not need to follow these steps.

### Node.js

- Ensure you have Node.js installed. Eurocapi is developed with Node.js and uses it as the runtime environment. You can check your Node.js version by running `node -v` in your terminal. If you don't have Node.js installed, you can download it from the [official website](https://nodejs.org/).

### Dependencies

- Run `npm install` in the project directory. This will install server-related dependencies such as `express`.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`, and adding your password.
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

- Run `npm start` in project directory to start the Express server on port 4000. It's recommended to use `nodemon` for automatic server restarts during development. If you don't have `nodemon`installed, you can install it globally using `npm install -g nodemon`.
- In another terminal, navigate to the `client` directory (`cd client`) and run `npm run dev` to start the client in development mode with hot reloading in port 5173.

### APIs

- To get the full experience of Eurocapi, please create another `.env` file, this time in the `src` folder (in the client side), and add the following:

```bash
  VITE_WEATHER_KEY=YOURAPIKEY
  VITE_PRICES_HOST=cost-of-living-and-prices.p.rapidapi.com
  VITE_RAPID_KEY=YOURAPIKEY
  VITE_HOTELS_HOST=apidojo-booking-v1.p.rapidapi.com
```

- You can find your API keys in the following links:

  * For the `VITE_WEATHER_KEY`, please visit [Open Weather Map](https://openweathermap.org/api), log in or sign up and generate an API key. This API allows the user see the current temperature of each capital.
  * For the `VITE_RAPID_KEY`, please create an account (if you don't have one already) on RapidAPI, and subscribe yourself to this [Booking API](https://rapidapi.com/apidojo/api/booking) and to this [Costs-of-Living-and-Prices API](https://rapidapi.com/traveltables/api/cost-of-living-and-prices). Both of these APIs have a free plan (the Basic subscription), just make sure you stick to the request limits. You can find your API key in the "Endpoints" window of either API under the name "X-RapidAPI-key". The Booking API allows the user to search for hotels and get redirected to Booking when finding a hotel they like, and the Costs-of-Living-and-Prices API is for the user to see the current average prices in each capital.
