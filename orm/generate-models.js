/*
this script is used to generate the javascript models
that sequelize uses to interact with the database.
the script uses database credentials stored in the config/keys
folder to connect to the database, read the tables, and generate
the corresponding javascript models.

The node process that initiates this file is expected to run in the context of the 'orm' folder since wherever the script execpt a "models" sub-folder

configure the keys as per your database config and then
navigate to the "./orm" directory and run "node generate-models.js"
generic model options (such as paranoid=true) are set in the
`additional` object
*/

const exec = require("child_process").exec;
const db_obj = require("../config/keys").db_obj;

const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto(
  db_obj.database,
  db_obj.username,
  db_obj.password,
  {
    host: db_obj.host,
    dialect: "mysql",
    directory: "./models",
    port: db_obj.port,
    additional: {
      paranoid: true
    }
  }
);

auto.run(err => {
  if (err) throw err;
  else console.log("success!");
});
