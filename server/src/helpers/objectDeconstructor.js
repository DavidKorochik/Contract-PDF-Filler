exports.ObjectDeconstruct = (object, ...objectKeys) => {
  const response = {};
  objectKeys.forEach((key) => {
    if (!object[key]) {
      throw new Error(`${object} doesn't contain the key ${key}`);
    }
    response[key] = object[key];
  });

  return response;
};
