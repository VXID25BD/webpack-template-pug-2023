const path = require("path");
const PugPlugin = require("pug-plugin");

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "views", "index", "index.pug"),
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '/',
        filename: 'assets/js/[name].[contenthash:8].js'
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            js: {
                filename: "assets/js/[name].[contenthash:8].js"
            },
            css: {
                filename: "assets/css/[name].[contenthash:8].css"
            }
        })
    ],
    module: {
        rules: [
          {
            test: /\.pug$/,
            loader: PugPlugin.loader
          },
          {
            test: /\.(css|sass|scss)$/,
            use: ['css-loader', 'sass-loader']
          },
          {
            test: /\.(png|jpg|jpeg|ico)/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/img/[name].[hash:8][ext]'
            }
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/i,
            type: 'asset/resource',
            generator: {
              filename: 'assets/fonts/[name][ext][query]'
            }
          }
        ]
    },
    devServer: {
        static: {
          directory: path.join(__dirname, 'dist')
        },
        watchFiles: {
          paths: ['src/**/*.*', 'assets/scss/**/*.*'],
          options: {
            usePolling: true
          }
        }
      },
      stats: 'errors-only'

}