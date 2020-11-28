// webpack.config.js - главный файл с настройками
// и в папке build-utils создаем еще 2 доп.файла, куда будем отдельно выносить данные для разбаботки (development.config.js) и production (production.config.js)

// создадим const path, которая прописывается в module.exports в точке входа (entry) и выхода (output):
const path = require("path");

// свяжем файлы webpack.config.js и в папке build-utils (development.config.js и production.config.js)  между собой с помощью merge и пакета, установленного в package.json: webpack-merge и используб переменную { merge } в функии module.exports....
const { merge } = require("webpack-merge");

// импортируем плагины
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");

//прописываем функцию, которая затягивает из указанного пути через свойство mode  содержимое в одном случае development.config.js, в другом - production.config.js
// свойствами (env) являются development.config.js и production.config.js, которые обозначаются через свойство mode;
const loadModeConfig = (env) =>
  require(`./build-utils/${env.mode}.config`)(env);

//   module.exports - в нем описана конфигурация webpack;

//   вызываю { merge } как функию и передаю объект, в котором прописан объект настроек. Сначала прописываю свойство mode - ссылка на глобальную переменную окружения env.

// path (глоб.переменная, объект с методами)- который собирает в кучу путь к конкретному файлу, ориентируясь относительно корня компьютера;

// __dirname (глобальная переменная)  - ссылается на конкретное место, где она объявлена. Она будет возвращать то место, где нахожусь у себя на компьютере в данный момент, где находится мой проект. В данной функции ссылается на расположение папки проекта, т.е. src - папка с исходным кодом
// resolve - сошьет текущий путь, до момента сейчас, т.е. __dirname

// context -  от node берет path, с помощью resolve сшивает путь к текущему репозиторию через переменную __dirname и к ней пришей путь src;

// entry - точка входа, с чего начинается выстраивание дерева зависимостей webpack и указываю путь к этому файлу ./index.js, который лежит в папке src;

// output - точка выхода, где находится результируюий код, который необходим для считывания браузером. Этот код уже обработан, убрано все лишнее  и находится в специально созданной для этого папке dist. Снова прописываем path и __dirname, чтобы прописать, где мы будем находиться

// bundle - означает, что код уже созданный и оптимизированнный из всего, что мы написали до этого

//В свойстве объекта после merge, указано module
// module - в нем пропысываем правила обработки  различных расширений всех файлов - это rules;
// rules хранят массив [] объектов правил, состоит из имени расширения, которое нужно обрабатывать.
// test - хранит имя расширения; exclude - что нужно не учитывать, т.е. папку node modules; use - то, что нужно использовать, т.е. транспилятор, например babel-loader
//  /\.hbs$/ - библиотека handlebars js, которая помогает создавать шаблоны. У нее прописан функционал перебора массива данных и отрисовки генерации и создания одинаковых элементов по шаблону, который можно прописать как тебе нужно, чтобы выстраивались элементы. И из массива данных он подставляет значения в этот шаблон. Соответственно, сколько элементов в массиве, столько он создаст подобных элементов, записывая в эти элементы значения из массива.

// PLAGINS. Вызов Класса. Для использования плагинов создадим новые экземпляры Классов:
// CleanWebpackPlugin - очищает webpack, чтобы не хранил остаточные файлы и зачищал все старое после запуска и остановки проекта;
// FriendlyErrorsWebpackPlugin - не будет загрязнять console в терминале лишней информацией, позволяет выводить только важную и полезную информацию, которая влияет на сборку проекта;
// WebpackBar - показывает статус сборки проекта в %;

module.exports = (env) =>
  merge(
    {
      mode: env.mode,
      context: path.resolve(__dirname, "src"),

      entry: "./index.js",
      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js",
      },
      module: {
        rules: [
          {
            test: /\.js$/, // регулярное выражение
            exclude: /node_modules/, // через указ папку свойства не прогонять
            use: ["babel-loader"],
          },
          {
            test: /\.html$/,
            use: ["html-loader"],
          },
          {
            test: /\.(gif|png|jpe?g|svg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: 5000,
                },
              },
            ],
          },
          {
            test: /\.hbs$/,
            use: ["handlebars-loader"],
          },
        ],
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar(),
      ],
    },
    loadModeConfig(env)
  );
