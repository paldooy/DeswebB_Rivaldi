<template>
  <div class="login">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Username:</label>
        <input type="text" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p> <!-- SOAL: tambahkan directive percabangan -->
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    handleLogin() {
      if (this.username === 'admin' && this.password === 'admin') { //SOAL : cek jika user dan pass yang diinputkan adalah "admin"
        this.$emit('loginSuccess'); // Emit the event if login is successful
      } else {
        this.errorMessage = 'Invalid user or password'; //SOAL : Definisikan kalimat "invalid user or pass" jika gagal login
      }
    }
  }
};
</script>
<style>
 .error{
  color: red;
 }
</style>