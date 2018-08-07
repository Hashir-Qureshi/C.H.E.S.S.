//utility function for helping with joins when it's too hard to use sequelize
get_field_values = (rows, field) => {
  values = [];
  for (i = 0; i < rows.length; i++) {
    values.push(rows[i][field]);
  }

  return values;
};

join_rows = (
  parent_rows,
  child_rows,
  child_table_name,
  parent_key,
  child_key
) => {
  for (i = 0; i < parent_rows.length; i++) {
    parent_row = parent_rows[i];

    for (j = 0; j < child_rows.length; j++) {
      child_row = child_rows[j];
      if (child_row[child_key] === parent_row[parent_key]) {
        parent_row.dataValues[child_table_name] = child_row;
      }
    }
  }
  return parent_rows;
};

module.exports = { join_rows, get_field_values };
