//任务1：实现插件:挂载$router {install}
let Vue;
import Link from './krouter-link'
import View from './krouter-View'

class KVueRouter {//创建构造函数KVueRouter
  constructor(options) {
    this.$options = options
    //任务3：需要创建响应化的current属性，使得依赖的组件会重新render
    // Vue.util.defineReactive(this,'current','/')//$set也可以,util是源码里面来的，后面看源码再观察

    // const initial = window.location.hash.slice(1) || '/'
    // Vue.util.defineReactive(this,'current',initial)
    // 此处的defineReactive是Vue源码的调用——让对象的键响应式化用法是defineReactive(obj,key,value)
    
      this.current = window.location.hash.slice(1) || '/'
      Vue.util.defineReactive(this,'matched',[])

      this.match()
    // 上面util的第二种写法，就是用实例中的响应来实现
    // this.app = new Vue ({
    //   data() {
    //     return {
    //       current: '/'
    //     }
    //   },
    // })
    //this.current = '/';

    //创建一个路由映射表
    // this.routeMap = {}
    // options.routes.forEach(route => {
    //   this.routeMap[route.path] = route
    // })

    //监控url变化
    window.addEventListener('hashchange',this.onHashChange.bind(this))
    window.addEventListener('load',this.onHashChange.bind(this))
  }
  onHashChange() {
    this.current = window.location.hash.slice(1);
    this.matched = []
    this.match();
  }

  match(routes) {
    routes = routes || this.$options.routes

    for(const route of routes) {
      if(route.path === '/' && this.current === '/') {
        this.matched.push(route)
        return
      }
  
      if(route.path !== '/' && this.current.indexOf(route.path) != -1) {
        this.matched.push(route)
        if(route.children) {
          this.match(route.children)
        }
        return
      }
    }

  }
}

KVueRouter.install = function(_Vue){//基于KVueRouter构造函数来开发插件
  //保存构造函数，在KVueRouter里面使用
  Vue = _Vue;

  //挂载$router
  Vue.mixin({
    beforeCreate() {
      //确保根实例的时候才执行
      if(this.$options.router) {//this.$options是组件的所有属性
        Vue.prototype.$router = this.$options.router
        console.log(Vue.prototype);
      } 
    }
  })

  //任务2：实现两个全局组件router-view和router-link
  //因为当前没有是只在运行时的，所以template不会被编译，要用到render去手动编译下
  Vue.component('router-link',Link)
  Vue.component('router-view',View)
}

export default KVueRouter