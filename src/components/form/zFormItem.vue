<template>
  <div>
    <label v-if="label">{{label}}</label>
    <slot></slot>
    <br />
    <p v-if="error">{{error}}</p>
  </div>
</template>

<script>
import Schema from "async-validator";
import emitter from "@/components/mixins/emitter";
export default {
  componentName: "zFormItem",
  inject: ["form"],
  mixins:[emitter],
  props: {
    label: {
      //标题
      type: String,
      default: ""
    },
    prop: {
      //字段名
      type: String,
      default: ""
    }
  },
  data() {
    return {
      error: ""
    };
  },
  methods: {
    validate() {
      //1、获得对应Form校验规则和校验值
      // console.log(this.form.rules[this.prop]);

      //2、获得对应FormItem校验规则
      console.log(this.form.model);

      const rules = this.form.rules[this.prop];
      //获得校验值
      const value = this.form.model[this.prop];
      //校验描述对象
      const descriptor = { [this.prop]: rules };
      //创造检验器
      const schema = new Schema(descriptor);
      //返回Promise，没有触发catch则表示验证通过
      return schema.validate({ [this.prop]: value }, errors => {
        if (errors) {
          this.error = errors[0].message;
        } else {
          //验证通过
          this.error = "";
        }
      });
    }
  },
  mounted() {
    this.$on("validate", () => {
      this.validate();

      if (this.prop) {
        this.dispatch("zForm", "hxz.form.addField", [this]);
      }
    });
  }
};
</script>

<style scoped>
</style>