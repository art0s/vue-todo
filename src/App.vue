<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
  margin: 20px auto;
  padding: 15px;
}

h1 {
  position: relative;
  font-size: 24px;
  height: 30px;
  line-height: 30px;
  margin: 20px 0;
  padding: 0;
  text-align: center;

  &.loading {
    &:after {
      content: " ";
      position: absolute;
      width: 16px;
      height: 11px;
      background-image: url("./assets/loader.gif");
      bottom: -10px;
      left: 50%;
      margin-left: -8px;
    }
  }
}
</style>
