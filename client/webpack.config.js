const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'main.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {modules: true, importLoaders: 1}},
          'postcss-loader',
        ],
      },
    ],
  },
  resolve: {
    alias: {
      _store: path.resolve(__dirname, 'src/store'),
      _components: path.resolve(__dirname, 'src/components'),
      _pages: path.resolve(__dirname, 'src/pages'),
      _utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    publicPath: '/',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'dist/index.html'),
    }),
  ],
}
