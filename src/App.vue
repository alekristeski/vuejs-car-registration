<template>
  <div id="app">
    <v-sheet>
      <div
        id="nav"
        style="display:flex;
    justify-content: center"
      >
        <router-link to="/">Vehicle Entry Form</router-link> |
        <router-link to="/about">Grid of vehicles</router-link>
      </div>
    </v-sheet>
    <router-view />
  </div>
</template>

<style lang="scss">
#nav {
  padding-top: 20px;
  margin: 10px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
