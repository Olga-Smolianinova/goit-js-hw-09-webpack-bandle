// содержит набор плагинов и библиотек, которые обрабатывают проект во время разработки (development)

//использует const path, которую затягивает "из-под капота" node
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

// use loader для обработки файлов css;
// даем установки для запуска и работы devServer;
// template - это шаблон, который указывает, что главный файл ./index.html, который нужно создать внутри src папки;
module.exports = (env) => ({
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 4141,
    noInfo: true,
    quiet: true,
    clientLogLevel: "warning",
    stats: "errors-only",
    open: true,
  },
});
