import superagent from 'superagent'

const host = process.env.Host || 'localhost'
const port = process.env.PORT || 3000

function formatUrl(path){
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  return `/api${adjustedPath}`
}