let alpha = "QqWwEeRrTtYyUuIiOoPpAaSsDdFfGgHhJjKkLlZzXxCcVvBbNnMm";
let num = "0123456789";

/**
 *
 * @param {Number} length length of the random generated text
 */
module.exports = function (length) {
  let result = "";
  let index = 0;
  for (index; index < length; index++) {
    if (index % 2 === 0) {
      result += num[Math.round(Math.random() * (num.length - 1))];
    } else {
      result += alpha[Math.round(Math.random() * (alpha.length - 1))];
    }
  }

  return result;
};
