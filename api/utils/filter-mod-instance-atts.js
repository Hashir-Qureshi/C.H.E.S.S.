//function used to restrict values returned from the database to
//values that are explicitly set.
//This function should be called any time we are retrieving data from the database and returning it back
//to the user (if ORM doesn't already allow an options to restrict for us)
const filter_model_instance = (model_instance, cols_to_keep) => {
  let temp_obj = {};
  Object.assign(temp_obj, model_instance);

  Object.keys(temp_obj.dataValues).forEach(col => {
    if (!cols_to_keep.includes(col)) delete temp_obj.dataValues[col];
  });

  return temp_obj;
};

module.exports = filter_model_instance;
