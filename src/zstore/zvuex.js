let Vue;

class Store {
  constructor(options) {
    this._mutations = options.mutations || {}
    this._actions = options.actions || {}
    this.wrappedGetters = options.getters || {}

    const computed = {} 
    this.getters = {}
    Object.keys(this.wrappedGetters).forEach(key => {
      const store = this
      const fn = store.wrappedGetters[key]
      computed[key] = function() {
        return fn(store.state)
      }
      Object.defineProperty(store.getters,key,{
        get () {
          console.log(store._vm);
          
          return store._vm[key]
        }
      })
    })
    
    this._vm = new Vue({
      data: {
        $$state: options.state
      },
      computed
    })
    
    const store = this
    const {commit,dispatch} = this

    this.commit = function boundCommit (type,payload) {
      return commit.call(store,type,payload,options)
    }

    this.dispatch = function boundDispatch (type,payload) {
      return dispatch.call(store,type,payload,options)
    }
  }
  
  get state() {
    return this._vm._data.$$state    
  }

  set state(v) {
    console.error("你造吗？你这样太造了");
  }


  commit(type,payload) {
    console.log(this);
    
    const entry = this._mutations[type]
    
    if(!entry) {
      console.error(" your mutations name undefined");
      return
    }
    
    entry(this.state,{payload})
  }

  dispatch(type,payload) {
    const entry = this._actions[type]
    
    if(!entry) {
      console.error(" your actions name undefined");
      return
    }
    console.log(this);
    
    entry(this,{payload})
  }
}

function install(_Vue) {
  Vue = _Vue
  //这个install传入的_Vue也就是第一个参数就是Vue的构造函数
  

  Vue.mixin({
    beforeCreate() {
      // console.log(this.$options);
      if((this.$options.store)) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}
export default({
  Store,
  install
})

