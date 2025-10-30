<template>
  <div class="dashboard">
    <h2>Welcome to the Dashboard</h2>
    <p>You are logged in.</p>
    <button @click="logout">Logout</button><!-- SOAL: tambahkan directive event listener -->
  </div>
</template>

<script>
export default {
  name: 'UserDashboard',
  methods: {
    logout() {
      this.$emit('logout');
    }
  }
};
</script>

<style scoped>
.dashboard {
  text-align: center;
}
</style>