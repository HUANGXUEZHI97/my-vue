<template>
  <form>
    <slot></slot>
  </form>
</template>

<script>
export default {
  provide() {
    return {
      form: this
    };
  },
  componentName:'zForm',
  props: {
    model: {
      //获得规定数据
      type: Object,
      required: true
    },
    rules: {
      //获得规则
      type: Object
    }
  },
  methods: {
    validate(cb) {
      // const tasks = this.$children
      //   .filter(item => item.prop)
      //   .map(item => item.validate());
      const tasks = this.fields.map(item => item.validate())


      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    }
  },
  created() {
    this.fields = [];
    this.$on('hxz.form.addField',item =>{
      this.fields.push(item)      
    })
  }
};
</script>

<style scoped>
</style>