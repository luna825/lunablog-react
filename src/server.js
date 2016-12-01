var path = require('path')
var express = require('express')
var webpack = require('webpack')

var app = express();
var isDev = process.env.NODE_ENV === 'development'

var port = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, '../public')))

if(isDev){
  var config = require('../cfg/webpack.dev.js')
  var compiler = webpack(config)

  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath,
    noInfo: true,
    stats:{colors:true}
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.use('*', (req, res)=>{
  res.sendFile(path.join(__dirname,'../public/index.html'))
})

app.listen(port, function(err) {
  if (err) {
    console.error(err)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})