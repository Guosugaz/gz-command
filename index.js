const decodeParams = function (str) {
  try {
    if (!str) return {};
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};
const encodeParams = function (params) {
  return JSON.stringify(params);
};

const selfName = "gz-command-env-parmas"

module.exports = {
  selfName,
  getParmas() {
    return decodeParams(process.env[selfName]);
  },
  genParams(params) {
    return params ? { [selfName]: encodeParams(params) } : {};
  }
};
