import Vue from 'vue'
import Notice from "@/components/Notice.vue"

function create(Component,props){
  //1、用Vue.extend
  const Ctor = Vue.extend(Component)
  
  const comp = new Ctor({propsData: props})
  comp.$mount()

  document.body.appendChild(comp.$el)

  comp.remove = function() {
    document.body.removeChild(comp.$el)

    comp.$destroy();
  }
  //2、用render
  // const vm = new Vue({
  //   render:h => h(Component,{props})
  // }).$mount()

  // document.body.appendChild(vm.$el)

  // const comp = vm.$children[0];

  // comp.remove = function() {
  //   document.body.removeChild(vm.$el)

  //   vm.$destroy();
  // }
  return comp
}

export default {
  install(Vue) {
    Vue.prototype.$notice = function(options) {
      return create(Notice,options)
    }
  }
}