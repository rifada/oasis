const path = require('path')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: path.resolve(__dirname, "./docs/"),
  assetsDir: "./static/"
  
  // outputDir: path.resolve(__dirname, "../springboot/src/main/resources/static"),
  // assetsDir: "./static/"
}