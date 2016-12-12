export default function promiseMiddleware( client ){
  return store=>next=>action=>{
    const {promise, types, ...rest} = action;

    if(!promise) {
      return next(action)
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({type:REQUEST, ...rest})

    const actionPromise = promise(client)
    actionPromise.then((result)=>{
      console.log(result)
      next({type:SUCCESS, result, ...rest })
    }
    ).catch((error)=>{
      console.log('Middeware Error:', error)
      return next({type:FAILURE, error, ...rest})
    })

    return actionPromise;
  }
  
}