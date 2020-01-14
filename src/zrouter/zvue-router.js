let Vue;
import Link from './zrouter-link'
import View from './zrouter-view'

// 1、生成构造函数和install方法
class ZVueRouter {
  constructor(options) {
    this.$options = options
    
    // Vue.util.defineReactive(this,'current','/')
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this,'current',initial)
    //2、嵌套路由：定义数组matched遍历获取hash地址层信息
    // this.current = window.location.hash.slice(1) || '/'
    // Vue.util.defineReactive(this,'matched',[])
    // this.match()


    // window.addEventListener('hashchange',this.onhashchange)//指向window
    window.addEventListener('hashchange',this.onhashchange.bind(this))//指向构造函数ZVueRouter
    window.addEventListener('load',this.onhashchange.bind(this))
    // window.addEventListener('hashchange',() => {
    //   this.current = window.location.hash.slice(1)
    // })
    //创建一个路由映射表
    this.routermap = []
    options.routes.forEach(route => {
      this.routermap[route.path] = route
    })
    
  }

  onhashchange() {
    this.current = window.location.hash.slice(1)
    // this.matched = []
    // this.match()
  }
//3、嵌套路由：定义方法match遍历获取hash地址层信息
  // match(routes) {
  //   routes = routes ||this.$options.routes

  //   //递归遍历
  //   for (const route of routes) {
  //     if (route.path === '/'  && this.current === '/') {
  //       this.matched.push(route)
  //       return
  //     }

  //     // /about/info
  //     if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
  //       this.matched.push(route)
  //       if(route.children) {
  //         this.match(route.children)
  //       }
  //       return
  //     }
  //   }
  // }
}

ZVueRouter.install = function(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {      
      if(this.$options.router){
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 2、创建link和view组件
  Vue.component('router-link',Link)
  Vue.component('router-view',View)
}

export default ZVueRouter