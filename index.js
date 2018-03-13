
module.exports = function (app, opts) {
  return function (state, actions, view, container) {
    opts = opts || {}
    var storage = opts.storage || 'hyperapp-persist'
    var include = opts.include || null
    if (include != null && !Array.isArray(include)) {
      include = [include];
    }

    // var _init = props.init
    
    // props.init = function (state, actions) {
    //   if (_init) _init.apply(null, arguments)

    //   var data = localStorage.getItem(storage)
    //   if (data) actions.__restore(JSON.parse(data))
    // }
      
    // window.addEventListener('unload', function () {
      // console.log('unload')
      // actions.__save()
    // })

    // actions.__restore = function (_s, _a, previous) {
    //   return previous
    // }

    actions.__restore = function () {
      var data = localStorage.getItem(storage)
      return JSON.parse(data)
    }
    
    actions.__save = function (state) {
      localStorage.setItem(storage, JSON.stringify(state, include))
    }

    actions.__clear = function () {
      localStorage.removeItem(storage)
    }
    
    return app(state, actions, view, container)
  }
} 
