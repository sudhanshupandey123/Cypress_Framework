
function setContextVar(context, varName, value, level = "scenario") {
  if (!context.vars) context.vars = {};
  if (!context.tag_vars) context.tag_vars = {};
  if (!context.feature_vars) context.feature_vars = {};

  if (level === "scenario") {
    context.vars[varName] = value;
  } else if (level === "tag") {
    context.tag_vars[varName] = value;
  } else if (level === "feature") {
    context.feature_vars[varName] = value;
  } else {
    throw new Error(`Level ${level} defined is invalid.`);
  }
}


function getContextVar(context, varName, fail = false, level = "scenario") {
  if (!context.vars) context.vars = {};
  if (!context.tag_vars) context.tag_vars = {};
  if (!context.feature_vars) context.feature_vars = {};

  if (level === "scenario" && fail) {
    if (!(varName in context.vars)) throw new Error(`Variable ${varName} not found in scenario context`);
    return context.vars[varName];
  } else if (level === "tag" && fail) {
    if (!(varName in context.tag_vars)) throw new Error(`Variable ${varName} not found in tag context`);
    return context.tag_vars[varName];
  } else if (level === "feature" && fail) {
    if (!(varName in context.feature_vars)) throw new Error(`Variable ${varName} not found in feature context`);
    return context.feature_vars[varName];
  } else {
    return context.vars[varName] !== undefined ? context.vars[varName] : varName;
  }
}

module.exports = { setContextVar, getContextVar };



