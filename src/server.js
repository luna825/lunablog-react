var path = require('path')
var express = require('express')
var webpack = require('webpack')

var httpProxy = require('http-proxy')
var appCfg = require('../cfg/appCfg')

var app = express();

var targetUrl = "http://" + appCfg.APIHOST + ":" + appCfg.APIPORT
var proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});


var isDev = process.env.NODE_ENV === 'development'
var port = process.env.PORT || appCfg.PORT

app.use(express.static(path.join(__dirname, '../public')))
app.use('/api', function(req, res){
  proxy.web(req, res, {target: targetUrl})
})

proxy.on('error', (error, req, res) => {
  var json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

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