<template>
  <div>
    <h3>XZForm表单</h3>
    <br />
    <!-- 用户名 -->
    <xz-form :model="model" :rules="rules" ref="loginForm">
      <xz-form-item label="用户名" prop="username">
        <xz-input type="text" v-model="model.username"></xz-input>
      </xz-form-item>
      <!-- 密码 -->
      <xz-form-item label="用户密码" prop="password">
        <xz-input type="password" v-model="model.password"></xz-input>
      </xz-form-item>
      <!-- 提交按钮 -->
      <xz-form-item >
        <button @click="login">登录</button>
      </xz-form-item>
    </xz-form>
  </div>
</template>

<script>
import xzInput from "@/components/Form/zInput.vue";
import xzFormItem from "@/components/Form/zFormItem.vue";
import xzForm from "@/components/Form/zForm.vue";
// import Notice from "@/components/Notice.vue";

export default {
  data() {
    return {
      model: {
        username: "xz",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入用户名" }],
        password: [{ required: true, message: "请输入用户密码" }]
      }
    };
  },
  components: {
    xzInput,
    xzFormItem,
    xzForm
  },
  methods: {
    login() {
      this.$refs["loginForm"].validate(valid => {
        const notice = this.$notice({
          title: "社会你杨哥喊你来搬砖",
          message: valid ? "请求登录!" : "校验失败!",
          duration: 3000
        });
        notice.show();
      });
    }
  }
};
</script>

<style scoped>
</style>