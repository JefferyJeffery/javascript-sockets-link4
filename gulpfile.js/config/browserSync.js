var config = require('./')

module.exports = {
  files: ['public/**/*.html'],
  proxy: "http://localhost:3000",
  port: 7000
}
