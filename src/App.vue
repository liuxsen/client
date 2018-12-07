<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('./style/atom-common.min.css');
@import url('./style/atom-pc.1.min.css');
@import url('./style/atom-pc.2.min.css');
@import url('./style/atom-pc.3.min.css');
@import url('./style/atom-pc.4.min.css');
@import url('./style/atom-pc.min.css');
body {
  margin: 0;
}
html,
body {
  min-height: 100%;
  background: #eeeeee;
}
.m-auto {
  margin-left: auto;
  margin-right: auto;
}
</style>
