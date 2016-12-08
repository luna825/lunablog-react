import superagent from 'superagent'
import appCfg from '../../cfg/appCfg'


function formatUrl(path){
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  return `/api${adjustedPath}`
}

const methods = ['get', 'post', 'put', 'del', 'path']

export default class ApiClient {

  constructor(req){
    methods.forEach((method)=>{
      this[method] = (path, {params, data, token} = {}) => new Promise((resolve, reject)=>{
        const request = superagent[method](formatUrl(path))

        if(token){
          request.set('Authorization', 'Bearer ' + token)
        }

        if(params){
          request.query(params)
        }

        if(data){
          request.send(data)
        }

        request.end((err, res)=> err ? reject(res.body || err) : resolve(res.body) ) 

      })
    })
  }
}