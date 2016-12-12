var path = require('path')
var webpack = require('webpack')

var projectRootPath = path.resolve(__dirname, '..')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractCSS = new ExtractTextPlugin('antd.css');
let extractSCSS = new ExtractTextPlugin('styles.css');

var plugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
  extractCSS,
  extractSCSS
]

const antOptions ={
  "libraryName": "antd",
  "style": 'css',   // or 'css'
}

var config = {
  entry:[
    "font-awesome-webpack!./src/theme/font-awesome.config.js", 
    'bootstrap-loader/extractStyles',
    path.resolve(projectRootPath, 'src', 'app.js') 
  ],
  output:{
    path:path.resolve(projectRootPath, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath:'/assets/'
  },
  module:{
    loaders:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:['react', 'es2015', 'stage-0'],
          plugins:['transform-decorators-legacy',['import', antOptions]]
        } 
      },
      {
        test: /\.css$/,loader: extractCSS.extract("style-loader","css-loader")
      },
      {
        test:/\.scss/,
        loader: extractSCSS.extract(['css', 'sass'])
      },
      {
        test:/\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /.*\.(gif|png|jpe?g)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]'
        ]
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  resolve:{
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: plugins
}

if (process.env.NODE_ENV === 'development'){
  config.devtool = 'eval';
  config.entry.unshift ('webpack-hot-middleware/client');
  config.plugins.unshift(new webpack.HotModuleReplacementPlugin());
  config.module.loaders[0].query.plugins.push([
   'react-transform', {
      transforms:[{
        transform : 'react-transform-hmr',
        imports   : ['react'],
        locals    : ['module']
      }]
    }
  ])
}

module.exports = config