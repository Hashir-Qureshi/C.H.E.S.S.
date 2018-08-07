//checks to make sure all attributes given exist
const do_attributes_exists = (attributes, res, required_attributes) => {
  missing_attr = [];
  for (i = 0; i < required_attributes.length; i++) {
    required_att = required_attributes[i];
    if (!attributes[required_att]) {
      missing_attr.push(required_att);
    }
  }

  if (missing_attr.length) {
    return res
      .status(400)
      .json({ "missing required attributes": missing_attr });
  }
};

//checks if at least one of the attributes exist
const does_one_attribute_exist = (attributes, res, required_attributes) => {
  missing_attr = [];
  for (i = 0; i < required_attributes.length; i++) {
    required_att = required_attributes[i];
    if (attributes[required_att]) {
      return;
    } else {
      missing_attr.push(required_att);
    }
  }

  if (missing_attr.length) {
    return res
      .status(400)
      .json({
        "missing required attributes. At least one of the following is required": missing_attr
      });
  }
};

module.exports = { do_attributes_exists, does_one_attribute_exist };
