const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  root: path.join(__dirname, '/'),
  src: path.join(__dirname, '/src'),
  dist: path.join(__dirname, '/dist'),
};

let config = {

  mode: 'development',

  entry: './src/scripts/main.js',

  output: {
    path: PATHS.dist,
    filename: 'scripts/main.js'
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {
          attrs: [":src"]
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.sass$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10 * 1024
      //   }
      // },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-url-loader',
      //   options: {
      //     limit: 10 * 1024,
      //     noquotes: true,
      //   }
      // },
      // {
      //   test: /\.(gif|png|jpe?g|svg)$/i,
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[path][name].[hash:6].[ext]',
      //         emitFile: true,
      //         esModule: false,
      //         enforce: 'pre'
      //       }
      //     },
      //     // {
      //     //   loader: 'webp-loader',
      //     //   options: {
      //     //     quality: 100
      //     //   }
      //     // }
      //   ]
      // },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/',
            esModule: false,
          }
        }]
      },
      {
        test: /\.(mov|mp4)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/videos/',
          esModule: false,
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/fonts/',
              esModule: false,
            },
          }
        ]
      },
      {
        test: /\.handlebars$/, loader: "handlebars-loader"
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
};

module.exports = config