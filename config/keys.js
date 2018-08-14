dev_database_url = "mysql://root:root@localhost:3306/c.h.e.s.s.";
DATABASE_URL = process.env.DATABASE_URL || dev_database_url;
db_obj = {};
db_obj.database = process.env.DATABASENAME || "c.h.e.s.s.";
db_obj.username = process.env.DATABASEUSERNAME || "root";
db_obj.password = process.env.DATABASEPASSWORD || "root";
db_obj.host = process.env.DATABASEHOST || "localhost";
if (process.env.DATABASEPORT === "NONE") {
} else {
  db_obj.port = "3306";
}

module.exports = {
  DATABASE_URL,
  jwt_secret: process.env.jwt_secret || "c#vw7>9mZ{`sgxZ(7{Z{5Y],_MGLa",
  db_obj
};
