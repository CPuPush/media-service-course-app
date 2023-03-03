require('dotenv').config();
const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOSTNAME
} = process.env;
module.exports = {
  "development": {
    "username": DB_USERNAME,
    "password": null,
    "database": DB_DATABASE,
    "host": DB_HOSTNAME,
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
