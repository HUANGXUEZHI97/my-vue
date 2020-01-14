export default {
  render(h) {

    // 1、当获得路由的嵌套深度
    this.$vnode.data.routerView = true;

    let depth = 0;
    let parent = this.$parent

    while(parent) {
      const vnodeData = parent.$vnode && parent.$vnode.data

      if(vnodeData) {
        if(vnodeData.routerView) {
          depth++
        }
      }
      parent = parent.$parent
    }

    let component = null;
    const route = this.$router.matched[depth]
    if(route) {
      component = route.component
    }
    return h(component)

    //获得path对应的component
    // console.log(this.$router);//猜测this.$router是根router，实际：this.$router是根组件的router √猜测正确
    // const {routeMap,current} = this.$router;
    // //此处是ES6的解构
    // const component = routeMap[current].component//获得对应跳转的组件
    // return h(component)

    
    // this.$router.$options.routes.forEach(route =>{
    //   if(route.path === this.$router.current) {
    //     component = route.component
    //   }
    // })
    // return h(component)
  }
}