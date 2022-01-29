<template>
  <div class="app">
    <Navbar />

    <div class="main">
      <Sidebar />
      <div class="mainPage row justify-content-center">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Navbar2 from "./components/Navbar2";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar
  },
  data: () => ({
    //
  })
};
</script>
<style>
#app {
  font-family: "Roboto Condensed", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding: 0;
  color: #2c3e50;
  min-height: 100vh;
}

.mainPage {
  /* display: flex; */
  padding: 0 25px;
}
.main {
  display: flex;
}
@media screen and (max-width: 800px) {
  .mainPage {
    padding: 0;
  }
  * {
    display: none;
  }
}
</style>
