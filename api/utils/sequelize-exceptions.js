const build_errors = err => {
  handled_exceptions = ["SequelizeUniqueConstraintError"];
  let errors_collection = { errors: [] };

  const add_to_errors = err => {
    for (i = 0; i < err.errors.length; i++) {
      error = err.errors[i];
      err_returned = {
        message: error.message,
        type: error.type,
        validatorKey: error.validatorKey
      };
      err_returned["message"];
      errors_collection.errors.push(err_returned);
    }
  };

  if (err.name && handled_exceptions.includes(err.name)) {
    add_to_errors(err);
  }

  if (!errors_collection.errors.length) {
    console.log(err);
    errors_collection.errors = ["uncaught error"];
  }
  return errors_collection;
};

module.exports = { build_errors };
