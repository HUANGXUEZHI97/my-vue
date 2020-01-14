<template>
  <div>
    <input :type="type" :value="value" @input="onInput" v-bind="$attrs" />
  </div>
</template>

<script>
import emitter from "@/components/mixins/emitter";
export default {
  inheritAttrs: false,
  mixins: [emitter],
  props: {
    value: {
      //获得输入值
      type: String,
      default: ""
    },
    type: {
      //定义input类型
      type: String,
      default: "text"
    }
  },
  methods: {
    onInput(e) {
      //向上传递事件，返回输入值
      this.$emit("input", e.target.value);

      //通知校验层 xzFormItem启动校验
      // this.$parent.$emit('validate')
      this.dispatch("zFormItem", "validate");
    }
  }
};
</script>

<style scoped>
</style>