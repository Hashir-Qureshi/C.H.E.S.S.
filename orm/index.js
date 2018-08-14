const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const lodash = require("lodash");
const keys = require("../config/keys");

const sequelize = new Sequelize(keys.DATABASE_URL, {
  dialect: "mysql",
  operatorsAliases: false,
  logging: false
});
db = {};

models_dir = path.join(__dirname, "models");

fs.readdirSync(models_dir)
  .filter(file => {
    return file.indexOf(".") !== 0;
  })
  .forEach(file => {
    var model = sequelize.import(path.join(models_dir, file));
    db[model.name] = model;
  });

//associate any explicit associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].options.hasOwnProperty("associate")) {
    db[modelName].options.associate(db);
  }
});

/*
//create associations based on reference values
Object.keys(db).forEach(model_name => {
  let model = db[model_name];
  Object.keys(model.attributes).forEach(field_name => {
    let field = model.attributes[field_name];
    if (
      field &&
      Object.keys(field) &&
      Object.keys(field).includes("references")
    ) {
      let ref = field.references;
      let target_model = db[ref.model];
      console.log(`Associating ${model_name} to ${ref.model}`);
      model.belongsTo(target_model, { targetKey: ref.key });
    }
  });
});
*/
module.exports = { sequelize, Sequelize, db };
