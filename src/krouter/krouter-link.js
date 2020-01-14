export default {
  props: {
    to: {
      type: String || Object,
      required: true
    },
  },
  render(h) {
    // render要使用必须要h(tag,data,children)
    //<router-link to="/about"></router-link>
    return h('a',{attrs:{href:'#'+this.to}},this.$slots.default)//class:router-link定义CSS
  }
}