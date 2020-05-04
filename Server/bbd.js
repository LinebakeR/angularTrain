const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    user: "alexw",
    password: "root",
    database: "blogDB"
      
  }
});

module.exports = knex;
