const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "blogDB"
      
  }
});

module.exports = knex;
