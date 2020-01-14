let Vue;

class Store {
  constructor(options = {}) {
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
        get() {
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


    // const store = this
    // const {commit,action} = store
    // this.commit = function boundCommit(type,payload) {
    //   commit.call(store,type,payload)
    // }
    // this.action = function boundAction(type,payload) {
    //   return action.call(store,type,payload)
    // }
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)
  }

  get state() {
    return this._vm._data.$$state
  }

  set state(v) {
    console.error("你造吗？你这样子不好！");

  }

  commit(type, payload) {
    const entry = this._mutations[type]

    if (!entry) {
      console.error(`unknown mutation type: ${type}`);
      return;
    }

    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if (!entry) {
      console.error(`unknown action type: ${type}`);
      return;
    }

    entry(this, payload)
  }
}

function install(_Vue) {
  Vue = _Vue;

  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}


//输出Vuex
export default {
  Store,
  install
}