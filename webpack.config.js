webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 'production' - 'development'
const MODE = 'development';
const enabledSourceMap = (MODE === 'development');
const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDevelopment,
  entry: {
    app: path.resolve(__dirname,'./src/app.js'),
  }, 
  output: {
    path: path.resolve (__dirname, 'dist') ,
    filename: 'scripts/bundle.js',
    // filename: 'scripts/[name].js',
    // chunkFilename: 'scripts/[id].[chunkhash].js'
  },
  devServer: {
    // clientLogLevel: 'warning',
    historyApiFallback: true,
    inline: true,
    // overlay: true,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    // compress: true,
    // host: 'localhost',
    // lazy: false,
    // open: true,
    // liveReload: false,
    // open: 'Google Chrome',
    port: 8212,
    watchOptions: {
      ignored: /node_modules/,
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      // poll: 1000,
    },
    // enable HMR
    hot: true,
    // hotOnly: true,
  },
  module: {
    rules: [
      // ------------------  Babel  -----------------------
      // -----------------------------------------------------
      {
        test: /\.jsx|js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          { 
            loader: 'babel-loader',
            options: {
              // Soporte de Javascript ES2015(ES6)
              presets: ['@babel/preset-env'],
            },
          },
        ],
        // include: path.join(__dirname, 'src')
      },
      // ------------------ Handlebars  -----------------------
      // -----------------------------------------------------
      {
        test: /\.handlebars|hbs$/,
        use: [
          { 
            loader: 'handlebars-loader',
            options: {
              // helperDirs: path.resolve(__dirname, "./js/helpers"),
            }
          },         
        ],
        // include: path.join(__dirname, 'src')
      },
      // ------------------  SASS  -----------------------
      // -----------------------------------------------------
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          { loader: MiniCssExtractPlugin.loader },
          {             
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader', 
            options: {
              url: true,
              sourceMap: enabledSourceMap,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
              importLoaders: 2
            },
          },
          { 
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              autoprefixer: {
                browsers: ['last 2 versions', 'Android >= 4'],
              },
              plugins: () => [
                  autoprefixer,
              ]
            }
          },          
          { 
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            }
          },
        ],
        // include: path.join(__dirname, 'src')
      },
      // ------------ FONTS: file-loader  --------------------
      // -----------------------------------------------------
      {
        test: /\.(woff|woff2|ttf|eot|otf|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
        // test: /\.(woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        // test: /\.(woff(2)?|ttf|eot|otf|svg)([\?]?.*)$/,
        // exclude: path.resolve(__dirname, "node_modules"), 
        use: [
          {
            loader: 'file-loader',
            options: {
              // name: '[name]-[hash].[ext]',
              name: '[name].[ext]', 
              outputPath: 'fonts/',
              prefix: "font", 
              limit: 10000, 
            }
          }
        ],
        // include: path.join(__dirname, 'src')
      },
      // -------------- IMAGES: url-loader -------------------
      // -----------------------------------------------------
      {
        test: /\.(gif|png|jpe?g|svg|jpg|png|gif|mp4|webm)$/,
        loader: 'file-loader', 
        options: {
          outputPath: 'images/',
          name: '[name]-[hash].[ext]',
          limit: 90000,
        },
        // include: path.join(__dirname, 'src'),
      },
    ],
  },
  watch: true,
  plugins:[
    // ver el módulo con nombre en lugar de la identificación en consola
    new webpack.NamedModulesPlugin(),
    // // Extraer css
    new MiniCssExtractPlugin({ 
      path: path.resolve(__dirname, 'build'),
      filename: 'styles/main.css',
      // filename: "[name] -styles.css",
      // chunkFilename: 'styles/[id].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/images/'),
        to: path.resolve(__dirname, 'build/images/'),
      },
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: '95-100',
      },
    }),
    // new CleanWebpackPlugin(['build']),
    // new webpack.LoaderOptionsPlugin ({ 
    //   opciones: { 
    //     handlebarsLoader: {} 
    //   } 
    // }),
    // Generar html 
    new HtmlWebpackPlugin({ // Generates default index.html
      title: 'Index template',
      template: './src/index.hbs',
      filename: "index.html",
      inject: true,
      minify: {
          removeComments: true,
          collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({ // Also generate a test.html
      title: 'Home template',
      template: path.resolve(__dirname, 'src/home.hbs'),
      filename: "home.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
      },
    }),
    new webpack.HotModuleReplacementPlugin(), // solo cargar se quiere recargar
    // new webpack.NoErrorsPlugin(),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {},
          ie8: false,
        },
      }),
    ],
  },
  // resolve: {
  //   extensions: ['*', '.js', '.jsx','.scss']
  // },
}