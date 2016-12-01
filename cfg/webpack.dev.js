var path = require('path')
var webpack = require('webpack')

var projectRootPath = path.resolve(__dirname, '..')

var plugins = [
  new webpack.DefinePlugin({
    'process.env':{
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]


var config = {
  entry:[ path.resolve(projectRootPath, 'src', 'app.js') ],
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
          plugins:[]
        } 
      }
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