const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/pages/index.html',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
              sources: {
                list: [
                  {
                    tag: 'img',
                    attribute: 'src',
                    type: 'src',
                  },
                  {
                    tag: 'link',
                    attribute: 'href',
                    type: 'src',
                  },
                  {
                    tag: 'script',
                    attribute: 'src',
                    type: 'src',
                  }
                ]
              }
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/img/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      filename: 'index.html',
      inject: 'body',
      publicPath: '/'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets',
          to: 'assets',
          globOptions: {
            ignore: ['**/*.html']
          }
        },
        {
          from: 'src/pages',
          to: 'pages',
          globOptions: {
            ignore: ['**/index.html']
          }
        }
      ],
    }),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    }
  }
}; 