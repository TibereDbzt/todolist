const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PATHS = {
    root: path.join(__dirname, '/'),
    src: path.join(__dirname, '/src'),
    dist: path.join(__dirname, '/dist'),
};

new webpack.EnvironmentPlugin(['NODE_ENV']);

let config = {

    mode: 'production',

    entry: './src/scripts/main.js',

    output: {
      path: PATHS.dist,
      filename: 'scripts/main.js',
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
                use: [MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        config: {
                            ctx: {
                                env: 'production'
                            }
                        }
                    }
                }, 'sass-loader']
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
        ]
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `main.css`
      })
    ]
};

module.exports = config;