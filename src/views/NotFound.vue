<template>
  <div class="not-found">
    <h1>404 - Not Found</h1>
    <span>To <router-link to="/">Main Page</router-link></span>
  </div>
</template>

<style scoped lang="scss">
.not-found {
  position: fixed;
  top: 20%;
  left: 50%;
  margin-left: -150px;
  width: 300px;
  height: 100px;
  background-color: #ddd;
  color: #000;
  font-size: 16px;
  text-align: center;
  h1 {
    margin-bottom: 10px;
  }
}
</style>
