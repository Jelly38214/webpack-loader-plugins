/**
 * tramsform comment require statement
 * // @require '../style/index.css' => require('../style/index.css')
 */
module.exports = function (source) {
  return source.replace(/(\/\/ *@require) +(('|").+('|")).*/, "require($2)");
};
