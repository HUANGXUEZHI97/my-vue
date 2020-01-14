export default {
  render(h) {

    // 1、嵌套路由：router-view深度标记，如果当前route有parent则+1
    // this.$vnode.data.routerView = true;

    // let depth = 0;
    // let parent = this.$parent;
    // while(parent) {    
        
    //   const vnodeData = parent.$vnode && parent.$vnode.data
      
    //   if(vnodeData) {
    //     if(vnodeData.routerView) {
    //       depth++
    //     }
    //   }
    //   parent = parent.$parent
    // }
    

    //嵌套路由：获取path对应得component
    // let component = null;
    // const route = this.$router.matched[depth]
    // if(route) {
    //   component = route.component
    // }
    
    // return h(component)

    const {routermap,current} = this.$router      
    const component = routermap[current].component
    return h(component)

        //循环模式判断然后渲染组件，耗费性能
    // let component = null
    // this.$router.$options.routes.forEach(route => {
    //   if(route.path === this.$router.current){
    //     component = route.component
    //   }
    // })
    // return h(component)
  }
}