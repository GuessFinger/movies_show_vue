<script setup>

</script>

<template>
  <div id="div_container">
    <div id="login_box">
      <h2>LOGIN</h2>
      <div id="input_box">
        <input type="text" placeholder="请输入用户名">
      </div>
      <div class="input_box">
        <input type="password" placeholder="请输入密码">
      </div>
      <button>登录</button>
      <br>
    </div>
  </div>
</template>

<style scoped>
#div_container {
  width: 100%;
  height: 100%;
  background: url('../assets/login.jpg');
  background-size: 100% 130%;
  display: flex;
}

#login_box {
  width: 20%;
  height: 400px;
  background-color: #00000060;
  margin: auto;
  text-align: center;
  border-radius: 10px;
  padding: 50px 50px;
}

h2 {
  color: #ffffff90;
  margin-top: 5%;
}

#input-box {
  margin-top: 5%;
}

span {
  color: #fff;
}

input {
  border: 0;
  width: 60%;
  font-size: 15px;
  color: #fff;
  background: transparent;
  border-bottom: 2px solid #fff;
  padding: 5px 10px;
  outline: none;
  margin-top: 10px;
}

button {
  margin-top: 50px;
  width: 60%;
  height: 45px;
  border-radius: 10px;
  border: 0;
  color: #fff;
  text-align: center;
  line-height: 30px;
  font-size: 15px;
  background-image: linear-gradient(to right, #30cfd0, #330867);
}

#sign_up {
  margin-top: 45%;
  margin-left: 60%;
}

a {
  color: #b94648;
}
</style>