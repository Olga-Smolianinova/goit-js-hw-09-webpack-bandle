const HtmlWebpackPlugin = require("html-webpack-plugin");

// важно минимизировать css, используем MiniCssExtractPlugin для этого и различного рода loaders
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// OptimizeCssAssetsPlugin дополняет MiniCssExtractPlugin, они работают в связке
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// содержит module - которое показывает как обрабатывать расширения
// использует свойство devtool, которое помогает в devtools показывать ошибки, которые возникают при сборке. В source-map можем посмотреть какие проблемы возникли
// и свойство plugins - которое перечисляет экземпляры плагинов
module.exports = (env) => ({
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, // вытянет из js
          "css-loader", // добавит все в js
          "postcss-loader", // добавляет автопрефиксы
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({ filename: "styles.scss" }),
    new OptimizeCssAssetsPlugin(),
  ],
});
